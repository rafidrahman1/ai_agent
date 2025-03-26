import openai from "../config/openaiClient.js";
import SYSTEM_PROMPT from "../config/systemPrompt.js";

/**
 * Sends an image prompt to the Monica API and gets its background removed.
 * @param {string} imageUrl - The URL of the image to analyze.
 * @returns {Promise<string>} - The URL of the processed image.
 */
export async function removeBackground(imageUrl) {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: imageUrl })
        };

        const response = await fetch(process.env.OPENAI_BG_URL, options);
        const data = await response.json();

        if (data.error) {
            throw new Error(`API Error: ${data.error.message}`);
        }

        return data.url; // Return the URL of the processed image
    } catch (error) {
        console.error("Error removing background:", error);
        throw error;
    }
}

/**
 * Sends an image prompt to the Monica API and gets the response.
 * @param {string} imageUrl - The URL of the image to analyze.
 * @returns {Promise<string>} - The AI-generated response.
 */
export async function sendImagePrompt(imageUrl) {
    try {
        const completion = await openai.chat.completions.create({
            model: process.env.OPENAI_SERVICE_MODE,
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