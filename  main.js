import {removeBackground, sendImagePrompt} from "./services/sendImagePrompt.js";

async function main() {
    try {
        // Need to provide image URL here. This is just a placeholder. The AI agent doesn't take images as input.
        const imageUrl = "https://monica-public-dev.s3.us-east-1.amazonaws.com/ugc-files/image-gen/generation-sdxl/80ddf974-9253-48fa-bc34-9f86845a1037/2pyPWQwVKYdCr3RGP3Cbrz41Km0.png";

        // Call the function to send the image prompt and get the response
        const response = await sendImagePrompt(imageUrl);

        const bgremovedImage = await removeBackground(imageUrl);

        console.log("AI Response:", response);
        console.log(bgremovedImage);
    } catch (error) {
        console.error("Error in main function:", error);
    }
}

main();