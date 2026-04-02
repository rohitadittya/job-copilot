import * as forgeService from '../services/forge.services.js';

export const generateResume = async (req, res) => {
    const { jd } = req.body;
    if (!jd) {
        throw new Error({ status: 400, message: 'Job description is required' });
    }
    const generatedResume = await forgeService.generateResume(jd);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
    res.status(200).send(generatedResume);
};

export const generateCoverLetter = async (req, res) => {
    const { jd } = req.body;
    if (!jd) {
        throw new Error({ status: 400, message: 'Job description is required' });
    }
    const generatedCoverLetter = await forgeService.generateCoverLetter(jd);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=coverletter.pdf');
    res.status(200).send(generatedCoverLetter);
};