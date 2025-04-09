import openai from "../config/openaiClient";

export const runLLM = async ({ userMessage }: { userMessage: string }): Promise<string> => {
    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        temperature: 0.1,
        messages: [{ role: 'user', content: userMessage }],
    });

    return response.choices[0].message.content || '';
};