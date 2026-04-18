import { CoreError } from "../../custom-errors/CoreError.js";

export const askLLM = async (prompt) => {
    const response = await fetch(process.env.CONVERSATIONAL_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            prompt,
            temperature: 0.2,
            stream: false,
            model: process.env.CONVERSATIONAL_MODEL,
        })
    });

    if (!response.ok) {
        throw new CoreError("Failed to get response from LLM", 500);
    }

    const data = await response.json();
    return data.response;
};