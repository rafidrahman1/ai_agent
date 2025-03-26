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

        console.log("Sending request to:", process.env.OPENAI_BG_URL);
        const response = await fetch(process.env.OPENAI_BG_URL, options);

        // Log the status code
        console.log("Response status:", response.status);

        const data = await response.json();

        // Log the full response for debugging
        console.log("API Response:", JSON.stringify(data, null, 2));

        if (data.error) {
            throw new Error(`API Error: ${data.error.message}`);
        }

        // Check different possible response formats
        if (data.url) {
            return data.url;
        } else if (data.data && data.data.url) {
            return data.data.url;
        } else if (data.result && data.result.url) {
            return data.result.url;
        } else if (data.image) {
            return data.image;
        } else {
            console.warn("Unexpected response format:", data);
            // If we can't find the URL in the expected places, return the whole data object
            // so we can at least see what's coming back
            return JSON.stringify(data);
        }
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