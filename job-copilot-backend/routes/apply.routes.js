import { Router } from 'express';
import { autofill } from '../controllers/apply.controller.js';

const router = Router();

router.post("/", autofill);

export default router;
