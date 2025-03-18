import { sendImagePrompt } from "./sendImagePrompt.js";

async function main() {
    try {
        const imageUrl = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.wondershare.com%2Fpixcut%2Fassets%2Fblog%2Fproduct-images-for-ecommerce-sitse-3.jpg&f=1&nofb=1&ipt=1de4f139132302adb102b8c694a5e044a37ba54e8a585ebbd3f76cf7b2b1439c&ipo=images";

        // Call the function to send the image prompt and get the response
        const response = await sendImagePrompt(imageUrl);

        console.log("AI Response:", response); // Log the AI response
    } catch (error) {
        console.error("Error in main function:", error);
    }
}

main();