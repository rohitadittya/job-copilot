import { safeParseJSON } from '../utils/jsonHelpers.js';
import { askLLM } from '../core/copilot/llm.js';
import { analyzeJobMatchPrompt } from '../core/copilot/prompts.js';

export const analyzeJobDescription = async (jd) => {
    const resumeModule = await import('../assets/resume.json', {
        assert: { type: 'json' }
    });
    const resume = resumeModule.default;
    const matchAnalysis = await askLLM(analyzeJobMatchPrompt(jd, JSON.stringify(resume)));

    return safeParseJSON(matchAnalysis);
};