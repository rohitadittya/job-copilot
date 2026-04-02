import { Router } from 'express';
import { generateCoverLetter, generateResume } from '../controllers/forge.controller.js';

const router = Router();

router.post('/resume', generateResume);
router.post('/coverletter', generateCoverLetter);

export default router;