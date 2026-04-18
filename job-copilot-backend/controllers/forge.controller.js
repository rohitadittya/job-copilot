import * as forgeService from '../services/forge.services.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../custom-errors/appError.js';

export const generateResume = asyncHandler(async (req, res) => {
    const { jobDescription } = req.body;
    if (!jobDescription) {
        throw new AppError('Job description is required', 400);
    }
    const generatedResume = await forgeService.generateResume(jobDescription);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
    res.status(200).send(generatedResume);
});

export const generateCoverLetter = asyncHandler(async (req, res) => {
    const { jobDescription } = req.body;
    if (!jobDescription) {
        throw new AppError('Job description is required', 400);
    }
    const generatedCoverLetter = await forgeService.generateCoverLetter(jobDescription);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=coverletter.pdf');
    res.status(200).send(generatedCoverLetter);
});