import OpenAI from "openai";
let client: OpenAI;

export const getOpenAIClient = () => {
    if (!client) {
        console.log('new client', process.env.OPENAI_API_KEY);
        client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    }
    return client;
}
