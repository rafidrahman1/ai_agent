import OpenAI from "openai";

const openai: OpenAI = new OpenAI({
    baseURL: process.env.OPENAI_URL,
    apiKey: process.env.OPENAI_API_KEY,
});

export default openai;