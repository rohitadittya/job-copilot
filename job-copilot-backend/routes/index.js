import express from 'express';
import insightsRoutes from './insights.routes.js';
import forgeRoutes from './forge.routes.js';
import applyRoutes from './apply.routes.js';

const router = express.Router();

router.use('/insights', insightsRoutes);
router.use('/forge', forgeRoutes);
router.use('/apply', applyRoutes);

export default router;