import express from 'express';
import dns from 'dns';
import http from 'http';

dns.setServers(['8.8.8.8', '8.8.4.4']);
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
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

// Load env vars
dotenv.config({ override: true });
import './lib/jwtSecret.js';

// Firebase is initialized in lib/firebaseAdmin.js
// Connect MongoDB (optional secondary backup store for text data, not required for primary Firestore). 
if (process.env.MONGODB_URI) {
    connectDB();
} else {
    console.warn('MONGODB_URI not set; optional secondary MongoDB backups are disabled. This is expected for local/dev setups when Firestore is the primary DB.');
}

const PORT = process.env.PORT || 5000;
const app = express();

// Required for Render / Heroku to correctly get client IP for rate limiting
app.set('trust proxy', 1);

// Middleware
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
  console.info('[CORS] Allowed origins:', [...origins].join(', '))
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
                console.warn('[CORS] Blocked request from origin:', origin);
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
        console.warn('[Redis] Rate limit store init failed, falling back to memory:', err.message);
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

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

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
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() });
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
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.log(`Health check available at http://localhost:${PORT}/health`);
});
scheduleTokenCleanup();
