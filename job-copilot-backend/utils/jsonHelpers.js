export const safeParseJSON = (text) => {
    try {
        const cleaned = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const jsonStart = cleaned.indexOf("{");
        const jsonEnd = cleaned.lastIndexOf("}");

        if (jsonStart === -1 || jsonEnd === -1) {
            throw new CoreError("No JSON found", 500);
        }

        return JSON.parse(cleaned.slice(jsonStart, jsonEnd + 1));
    } catch (err) {
        console.error("Failed to parse LLM response:", text);
        throw err;
    }
};