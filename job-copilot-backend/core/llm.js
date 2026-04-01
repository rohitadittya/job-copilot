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

    const data = await response.json();
    return data.response;
};