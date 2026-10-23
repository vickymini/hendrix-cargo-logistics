import { Router } from 'express';
import { login, logout, getMe } from '../controllers/adminAuthController';
import {
  listShipments,
  getShipmentById,
  createShipment,
  updateShipment,
  addCheckpoint,
  deleteShipment,
} from '../controllers/adminShipmentController';
import { getDashboardStats } from '../controllers/statsController';
import { listAuditLogs } from '../controllers/auditController';
import { listMessages, updateMessageStatus } from '../controllers/contactController';
import { updateCompanySetting } from '../controllers/settingsController';
import { requireAdminAuth } from '../middleware/auth';
import { authRateLimiter } from '../middleware/rateLimiter';
import { validateBody } from '../middleware/validate';
import { loginSchema } from '../validations/auth.schema';
import {
  createShipmentSchema,
  updateShipmentSchema,
  addCheckpointSchema,
} from '../validations/shipment.schema';

const router = Router();

// Authentication Endpoints
router.post('/auth/login', authRateLimiter, validateBody(loginSchema), login);
router.post('/auth/logout', logout);
router.get('/auth/me', requireAdminAuth, getMe);

// Dashboard Statistics
router.get('/stats', requireAdminAuth, getDashboardStats);

// Shipment Management Endpoints
router.get('/shipments', requireAdminAuth, listShipments);
router.post('/shipments', requireAdminAuth, validateBody(createShipmentSchema), createShipment);
router.get('/shipments/:id', requireAdminAuth, getShipmentById);
router.put('/shipments/:id', requireAdminAuth, validateBody(updateShipmentSchema), updateShipment);
router.delete('/shipments/:id', requireAdminAuth, deleteShipment);
router.post(
  '/shipments/:id/checkpoints',
  requireAdminAuth,
  validateBody(addCheckpointSchema),
  addCheckpoint
);

// Audit Trail & Logs
router.get('/audit-logs', requireAdminAuth, listAuditLogs);

// Contact Customer Messages
router.get('/messages', requireAdminAuth, listMessages);
router.put('/messages/:id/status', requireAdminAuth, updateMessageStatus);

// Company Settings (Admin override)
router.post('/settings', requireAdminAuth, updateCompanySetting);

export default router;
