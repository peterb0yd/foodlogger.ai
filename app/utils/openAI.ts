import OpenAI from "openai";
let client: OpenAI;

export const getOpenAIClient = () => {
    if (!client) {
        client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    }
    return client;
}
