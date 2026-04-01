import { askLLM } from '../core/llm.js';
import { generateCoverLetterPrompt, generateResumePrompt } from '../core/prompts.js';
import { safeParseJSON } from '../utils/jsonHelpers.js';

export const generateResume = async (jd) => {
    const resumeModule = await import('../assets/resume.json', {
        assert: { type: 'json' }
    });
    const resume = resumeModule.default;

    const generatedResume = await askLLM(generateResumePrompt(jd, JSON.stringify(resume)));
    return safeParseJSON(generatedResume);
};

export const generateCoverLetter = async (jd) => {
    const coverLetterModule = await import('../assets/coverletter.json', {
        assert: { type: 'json' }
    });
    const coverLetter = coverLetterModule.default;

    const generatedCoverLetter = await askLLM(generateCoverLetterPrompt(jd, JSON.stringify(coverLetter)));
    return safeParseJSON(generatedCoverLetter);
};