import * as insightService from '../services/insights.services.js';

export const analyzeJobDescription = async (req, res) => {
    try {
        const { jd } = req.body;
        if (!jd) {
            return res.status(400).json({ message: 'Job description is required' });
        }
        const result = await insightService.analyzeJobDescription(jd);
        res.status(200).json(result);
    }
    catch (error) {
        console.error('Error analyzing job description:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};