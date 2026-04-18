import express from 'express';
import dns from 'dns';
import http from 'http';

dns.setServers(['8.8.8.8', '8.8.4.4']);
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import pinoHttp from 'pino-http';
import { logger } from './lib/logger.js';
import { v4 as uuidv4 } from 'uuid';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import workshopRoutes from './routes/workshopRoutes.js';
import { init as initSocket } from './socket.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import { getRedisClient } from './lib/redisClient.js';
import { scheduleTokenCleanup } from './lib/tokenCleanup.js';
import mongoose from 'mongoose';

// Load env vars
dotenv.config({ override: true });
import './lib/jwtSecret.js';
import './lib/sentry.js';

// Firebase is initialized in lib/firebaseAdmin.js
// Connect MongoDB (optional secondary backup store for text data, not required for primary Firestore). 
if (process.env.MONGODB_URI) {
    connectDB();
} else {
    logger.warn('MONGODB_URI not set; optional secondary MongoDB backups are disabled. This is expected for local/dev setups when Firestore is the primary DB.');
}

const PORT = process.env.PORT || 5000;
const app = express();
let isShuttingDown = false;

// Required for Render / Heroku to correctly get client IP for rate limiting
app.set('trust proxy', 1);

// Middleware
app.use(compression());
const jsonParser = express.json();
const urlencodedParser = express.urlencoded({ extended: true });

app.use((req, res, next) => {
    if (req.originalUrl === '/api/payment/webhook') return next();
    return jsonParser(req, res, next);
});

app.use((req, res, next) => {
    if (req.originalUrl === '/api/payment/webhook') return next();
    return urlencodedParser(req, res, next);
});
app.use(cookieParser());
// Parse allowed origins from environment variables
const parseAllowedOrigins = () => {
  const origins = new Set([
    'http://localhost:5173',
    'http://localhost:3000',
  ])
  // Add from FRONTEND_URL env var
  if (process.env.FRONTEND_URL) {
    process.env.FRONTEND_URL.split(',').forEach(o => {
      const trimmed = o.trim().replace(/\/$/, '')
      if (trimmed) origins.add(trimmed)
    })
  }
  // Add from ALLOWED_ORIGINS env var (comma-separated list)
  if (process.env.ALLOWED_ORIGINS) {
    process.env.ALLOWED_ORIGINS.split(',').forEach(o => {
      const trimmed = o.trim().replace(/\/$/, '')
      if (trimmed) origins.add(trimmed)
    })
  }
  logger.info({ origins: [...origins] }, '[CORS] Allowed origins')
  return origins
}

const ALLOWED_ORIGINS = parseAllowedOrigins()

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);

            if (ALLOWED_ORIGINS.has(origin)) {
                callback(null, true);
            } else {
                logger.warn({ origin }, '[CORS] Blocked request from origin');
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    })
);
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:", "http:"],
            scriptSrc: ["'self'"],
            // Allow frontend app + websocket + Stripe + LinkedIn/Google auth redirects
            connectSrc: [
                "'self'",
                "https://api.stripe.com",
                "ws:",
                "wss:",
                "http://localhost:5173",
                "https://talentconnect-6e347.web.app",
                "https://talentconnect-6e347.firebaseapp.com",
                "https://talentconnect-api.onrender.com"
            ],
        },
    },
    crossOriginEmbedderPolicy: false, // Allow embedding for Stripe
    crossOriginOpenerPolicy: false, // Needed so oauth popups (Google/LinkedIn) can close themselves
}));

// Rate limiting
const buildStore = () => {
    const client = getRedisClient();
    if (!client || client.status !== 'ready') return undefined; // fallback to memory store
    try {
        return new RedisStore({ sendCommand: (...args) => client.call(...args) });
    } catch (err) {
        logger.warn({ err: err.message }, '[Redis] Rate limit store init failed, falling back to memory');
        return undefined;
    }
};

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    store: buildStore(),
    message: { message: 'Too many requests, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Strict limiter for admin login attempts
const adminLoginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { message: 'Too many admin login attempts. Try again in 15 minutes.' },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false,
    store: buildStore(),
});

// Stricter rate limiting for auth routes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Tightened from 100
    store: buildStore(),
    message: { message: 'Too many authentication attempts, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,  // Only count failures
});

// Apply general rate limiting
app.use(limiter);
// Apply strict admin-login limiter before auth routes
app.use('/api/auth/admin-login', adminLoginLimiter);

app.use(pinoHttp({
  logger,
  genReqId: (req) => req.headers['x-request-id'] || uuidv4(),
  customLogLevel: (_req, res, err) => {
    if (err || res.statusCode >= 500) return 'error'
    if (res.statusCode >= 400) return 'warn'
    return 'info'
  },
  customSuccessMessage: (req, res) => req.method + ' ' + req.url + ' ' + res.statusCode,
  customErrorMessage: (_req, _res, err) => err.message,
  serializers: {
    req: (req) => ({ id: req.id, method: req.method, url: req.url, userId: req.raw.user?.id }),
    res: (res) => ({ statusCode: res.statusCode }),
  },
  autoLogging: {
    ignore: (req) => req.url === '/health'
  },
}))

app.use((req, res, next) => {
  if (req.id) res.setHeader('X-Request-ID', req.id)
  next()
})

// Cache-Control for GET requests (exclude API)
app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
        res.set('Cache-Control', 'public, max-age=300');
    }
    next();
});

// Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/workshops', workshopRoutes);

// Health check endpoint
app.get('/health', async (req, res) => {
    const checks = {
        status: isShuttingDown ? 'shutting_down' : 'ok',
        uptime: Math.round(process.uptime()),
        timestamp: new Date().toISOString(),
        memory: {
            heapUsedMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
            heapTotalMB: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        },
        services: {},
    };

    try {
        const { db } = await import('./lib/firebaseAdmin.js');
        if (!db) {
            checks.services.firestore = 'not_configured';
            if (!isShuttingDown) checks.status = 'degraded';
        } else {
            await db.collection('_health').limit(1).get();
            checks.services.firestore = 'ok';
        }
    } catch {
        checks.services.firestore = 'error';
        if (!isShuttingDown) checks.status = 'degraded';
    }

    if (process.env.REDIS_URL) {
        try {
            const redis = getRedisClient();
            if (redis) {
                await redis.ping();
                checks.services.redis = 'ok';
            } else {
                checks.services.redis = 'not_connected';
                if (!isShuttingDown) checks.status = 'degraded';
            }
        } catch {
            checks.services.redis = 'error';
            if (!isShuttingDown) checks.status = 'degraded';
        }
    } else {
        checks.services.redis = 'disabled';
    }

    checks.services.mongodb = mongoose.connection.readyState === 1 ? 'ok' : (process.env.MONGODB_URI ? 'not_connected' : 'disabled');

    const httpStatus = checks.status === 'shutting_down' ? 503 : 200;
    res.status(httpStatus).json(checks);
});

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'TALENTCONNECT API is running...' });
});

app.use(notFound);
app.use(errorHandler);

const httpServer = http.createServer(app);
initSocket(httpServer);

httpServer.listen(PORT, '0.0.0.0', () => {
    logger.info({ port: PORT, env: process.env.NODE_ENV }, 'Server running');
    logger.info({ port: PORT }, 'Health check available at http://localhost:${PORT}/health');
});
scheduleTokenCleanup();

const gracefulShutdown = async (signal) => {
    if (isShuttingDown) return;

    isShuttingDown = true;
    logger.info({ signal }, '[Shutdown] Signal received - starting graceful shutdown');

    const forceExitTimer = setTimeout(() => {
        logger.error('[Shutdown] Forced exit after 10s timeout');
        process.exit(1);
    }, 10000);

    httpServer.close(async () => {
        logger.info('[Shutdown] HTTP server closed');

        try {
            try {
                const { getIO } = await import('./socket.js');
                getIO().close();
            } catch {}

            const redis = getRedisClient();
            if (redis) {
                await redis.quit();
                logger.info('[Shutdown] Redis connection closed');
            }

            if (mongoose.connection.readyState === 1) {
                await mongoose.connection.close();
                logger.info('[Shutdown] MongoDB connection closed');
            }

            clearTimeout(forceExitTimer);
            logger.info('[Shutdown] Graceful shutdown complete');
            process.exit(0);
        } catch (err) {
            clearTimeout(forceExitTimer);
            logger.error({ err }, '[Shutdown] Error during shutdown');
            process.exit(1);
        }
    });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('uncaughtException', (err) => {
    logger.error({ err }, '[FATAL] Uncaught exception');
    gracefulShutdown('uncaughtException');
});
process.on('unhandledRejection', (reason) => {
    logger.error({ reason }, '[FATAL] Unhandled promise rejection');
});
