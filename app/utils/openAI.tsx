import OpenAI from "openai";
let client: OpenAI;

const getOpenAIClient = () => {
    if (!client) {
        client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    }
    return client;
}
