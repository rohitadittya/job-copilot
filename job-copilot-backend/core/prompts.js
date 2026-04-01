export const analyzeJobMatchPrompt = (jd, resume) => `
    You are a recruiter.

    Analyze the following job description and candidate profile.

    Return ONLY valid JSON. Do NOT include:
    - markdown
    - code blocks
    - explanations
    - prefixes like "MATCH SCORE"

    Output format:
    {
        "matchScore": number between 0 to 100,
        "strengths": string[],
        "gaps": string[],
        "recommendation": "Apply" | "Caution" | "Skip"
    }

    Job Description:
    ${jd}

    Candidate:
    ${resume || "Not provided"}
`;