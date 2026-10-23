import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';
import { config } from './config';
import apiRouter from './routes';
import { errorHandler } from './middleware/errorHandler';

export const app = express();

// Trust reverse proxies (important for Render / Heroku / Cloudflare)
app.set('trust proxy', 1);

// Security Headers
app.use(
  helmet({
    contentSecurityPolicy: false, // Allows flexible CDN assets and fonts for modern styling
    crossOriginEmbedderPolicy: false,
  })
);

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      if (config.allowedOrigins.includes(origin) || !config.isProduction) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive in dev/staging preview
    },
    credentials: true,
  })
);

// Body parsers
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser());

// Request logger for API calls
if (!config.isProduction) {
  app.use((req, res, next) => {
    if (req.path.startsWith('/api') || req.path === '/health') {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    }
    next();
  });
}

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'Hendrix Cargo & Logistics API',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

// Mount Main API Router
app.use('/api', apiRouter);

// Serve static frontend build if present
const clientDistPath = path.resolve(__dirname, '../../client/dist');
const altClientDistPath = path.resolve(__dirname, '../client/dist');
const targetDist = fs.existsSync(clientDistPath)
  ? clientDistPath
  : fs.existsSync(altClientDistPath)
  ? altClientDistPath
  : null;

if (targetDist) {
  app.use(express.static(targetDist));

  // SPA fallback for non-API client routes
  app.get('*', (req: Request, res: Response, next) => {
    if (req.path.startsWith('/api') || req.path === '/health') {
      return next();
    }
    res.sendFile(path.join(targetDist, 'index.html'));
  });
} else {
  // If frontend not yet built
  app.get('/', (req: Request, res: Response) => {
    res.json({
      message: 'Hendrix Cargo & Logistics API is operational.',
      docs: '/api/settings',
      track: '/api/track/:trackingNumber',
      health: '/health',
    });
  });
}

// Global Central Error Handler
app.use(errorHandler);
