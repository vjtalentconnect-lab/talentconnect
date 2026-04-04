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

// Load env vars
dotenv.config({ override: true });

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
app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);

            const allowedOrigins = [
                'http://localhost:5173',
                'http://localhost:3000', 
                'https://talentconnect-6e347.web.app',
                'https://talentconnect-6e347.firebaseapp.com',
                'https://talentconnect-api.onrender.com'
            ];

            const envOrigin = process.env.FRONTEND_URL ? process.env.FRONTEND_URL.replace(/\/$/, '') : '';
            if (envOrigin && !allowedOrigins.includes(envOrigin)) {
                allowedOrigins.push(envOrigin);
            }

            if (allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
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
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Stricter rate limiting for auth routes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Relaxed for development
    message: 'Too many authentication attempts, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Apply general rate limiting
app.use(limiter);

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
