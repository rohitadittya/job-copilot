import { askLLM } from '../core/llm.js';
import { analyzeJobMatchPrompt } from '../core/prompts.js';
import { safeParseJSON } from '../utils/jsonHelpers.js';

export const analyzeJobDescription = async (jd) => {
    const resumeModule = await import('../assets/resume.json', {
        assert: { type: 'json' }
    });
    const resume = resumeModule.default;
    const matchAnalysis = await askLLM(analyzeJobMatchPrompt(jd, JSON.stringify(resume)));

    return safeParseJSON(matchAnalysis);
};