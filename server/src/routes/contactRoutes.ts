import { Router } from 'express';
import { submitContact } from '../controllers/contactController';
import { contactRateLimiter } from '../middleware/rateLimiter';
import { validateBody } from '../middleware/validate';
import { contactSchema } from '../validations/contact.schema';

const router = Router();

router.post('/', contactRateLimiter, validateBody(contactSchema), submitContact);

export default router;
