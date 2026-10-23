import { Router } from 'express';
import trackRoutes from './trackRoutes';
import adminRoutes from './adminRoutes';
import contactRoutes from './contactRoutes';
import { getCompanySettings } from '../controllers/settingsController';

const apiRouter = Router();

apiRouter.use('/track', trackRoutes);
apiRouter.use('/admin', adminRoutes);
apiRouter.use('/contact', contactRoutes);
apiRouter.get('/settings', getCompanySettings);

export default apiRouter;
