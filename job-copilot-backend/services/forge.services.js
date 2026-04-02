import { safeParseJSON } from '../utils/jsonHelpers.js';
import { generateResumePDF } from '../core/templateEngine/pdfGenerators/resumeGenerator.js';
import { generateCoverLetterPDF } from '../core/templateEngine/pdfGenerators/coverletterGenerator.js';
import { askLLM } from '../core/copilot/llm.js';
import { generateCoverLetterPrompt, generateResumePrompt } from '../core/copilot/prompts.js';

export const generateResume = async (jd) => {
    const resumeModule = await import('../assets/resume.json', {
        assert: { type: 'json' }
    });
    const resume = resumeModule.default;

    const generatedResume = await askLLM(generateResumePrompt(jd, JSON.stringify(resume)));
    const resumeData = safeParseJSON(generatedResume);
    return await generateResumePDF(resumeData);
};

export const generateCoverLetter = async (jd) => {
    const coverLetterModule = await import('../assets/coverletter.json', {
        assert: { type: 'json' }
    });
    const coverLetter = coverLetterModule.default;

    const generatedCoverLetter = await askLLM(generateCoverLetterPrompt(jd, JSON.stringify(coverLetter)));
    const coverLetterData = safeParseJSON(generatedCoverLetter);
    return await generateCoverLetterPDF(coverLetterData);
};