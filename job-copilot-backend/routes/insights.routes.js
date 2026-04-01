import express from 'express';
import { analyzeJobDescription } from '../controllers/insights.controller.js';

const router = express.Router();

router.post('/', analyzeJobDescription);

export default router;