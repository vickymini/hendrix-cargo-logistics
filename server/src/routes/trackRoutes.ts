import { Router } from 'express';
import { getShipmentByTrackingNumber } from '../controllers/trackController';
import { trackRateLimiter } from '../middleware/rateLimiter';

const router = Router();

// Public shipment tracking endpoint
router.get('/:trackingNumber', trackRateLimiter, getShipmentByTrackingNumber);
router.get('/', trackRateLimiter, getShipmentByTrackingNumber);

export default router;
