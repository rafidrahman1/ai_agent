import openai from "../config/openaiClient";
import type { AIMessage } from "../types";

export const runLLM = async ({ messages }: { messages: AIMessage[] }): Promise<string> => {
    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        temperature: 0.1,
        messages,
    });

    return response.choices[0].message.content || '';
};