import * as insightService from '../services/insights.services.js';

export const analyzeJobDescription = async (req, res) => {
    const { jd } = req.body;
    if (!jd) {
        throw new Error({ status: 400, message: 'Job description is required' });
    }
    const result = await insightService.analyzeJobDescription(jd);

    res.status(200).json(result);
};