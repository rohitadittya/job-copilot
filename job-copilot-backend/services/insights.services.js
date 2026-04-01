import { askLLM } from '../core/llm.js';
import { analyzeJobMatchPrompt } from '../core/prompts.js';

export const analyzeJobDescription = async (jd) => {
    try {
        const resumeModule = await import('../assets/resume.json', {
            assert: { type: 'json' }
        });
        const resume = resumeModule.default;

        const matchAnalysis = await askLLM(analyzeJobMatchPrompt(jd, JSON.stringify(resume)));
        const parsedMatchAnalysis = matchAnalysis
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();

        return JSON.parse(parsedMatchAnalysis);
    }
    catch (error) {
        console.error('Error analyzing job description:', error);
        throw error;
    }
};