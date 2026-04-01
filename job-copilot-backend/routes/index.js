import express from 'express';
import insightsRoutes from './insights.routes.js';
import forgeRoutes from './forge.routes.js';

const router = express.Router();

router.use('/insights', insightsRoutes);
router.use('/forge', forgeRoutes);

export default router;