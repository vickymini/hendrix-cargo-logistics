import { z } from 'zod';

export const loginSchema = z.object({
  usernameOrEmail: z.string().min(2, 'Username or email is required').trim(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const createAdminSchema = z.object({
  username: z.string().min(3).max(50).trim(),
  email: z.string().email().trim().toLowerCase(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  fullName: z.string().max(100).optional(),
  role: z.enum(['admin', 'superadmin', 'agent']).default('admin'),
});
