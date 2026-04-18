import * as insightService from '../services/insights.services.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../custom-errors/appError.js';

export const analyzeJobDescription = asyncHandler(async (req, res) => {
    const { jobDescription } = req.body;
    if (!jobDescription) {
        throw new AppError('Job description is required', 400);
    }
    const result = await insightService.analyzeJobDescription(jobDescription);
    res.status(200).json(result);
});