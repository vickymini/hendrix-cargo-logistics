import dotenv from 'dotenv';
import path from 'path';

// Load .env from workspace root or current directory
dotenv.config({ path: path.resolve(process.cwd(), '../.env') });
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  databaseUrl: process.env.DATABASE_URL || 'file:./dev.db',
  jwtSecret: process.env.JWT_SECRET || 'hendrix_cargo_super_secret_jwt_key_2026_xyz',
  sessionSecret: process.env.SESSION_SECRET || 'hendrix_cargo_super_secret_session_2026_abc',
  allowedOrigins: (process.env.ALLOWED_ORIGINS || 'http://localhost:5173,http://localhost:5000')
    .split(',')
    .map((o) => o.trim()),
  initialAdmin: {
    email: process.env.INITIAL_ADMIN_EMAIL || 'admin@hendrixcargo.com',
    username: process.env.INITIAL_ADMIN_USERNAME || 'admin',
    password: process.env.INITIAL_ADMIN_PASSWORD || 'HendrixAdmin2026!',
  },
};
