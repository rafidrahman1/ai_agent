import openai from "./config/openaiClient.js";
import SYSTEM_PROMPT from "./config/systemPrompt.js";

/**
 * Sends an image prompt to the Monica API and gets the response.
 * @param {string} imageUrl - The URL of the image to analyze.
 * @returns {Promise<string>} - The AI-generated response.
 */
export async function sendImagePrompt(imageUrl) {
    try {
        const completion = await openai.chat.completions.create({
            model: process.env.OPENAI_SERVICE_MODE, // Use the model specified in your environment
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                {
                    role: "user",
                    content: [
                        { type: "image_url", image_url: { url: imageUrl } },
                    ],
                },
            ],
        });

        return completion.choices[0].message.content; // Return the AI response
    } catch (error) {
        console.error("Error processing image or fetching completion:", error);
        throw error;
    }
}