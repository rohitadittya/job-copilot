import express from 'express';
import insightsRoutes from './insights.routes.js';

const router = express.Router();

router.use('/insights', insightsRoutes);

export default router;