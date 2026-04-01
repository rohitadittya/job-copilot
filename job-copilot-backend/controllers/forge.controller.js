import * as forgeService from '../services/forge.services.js';

export const generateResume = async (req, res) => {
    const { jd } = req.body;
    if (!jd) {
        throw new Error({ status: 400, message: 'Job description is required' });
    }
    const generatedResume = await forgeService.generateResume(jd);
    res.status(200).json(generatedResume);
};