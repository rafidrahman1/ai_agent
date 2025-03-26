import {removeBackground, sendImagePrompt} from "./services/sendImagePrompt.js";

async function main() {
    try {
        // Need to provide image URL here. This is just a placeholder. The AI agent doesn't take images as input.
        const imageUrl = "https://scontent.fdac99-1.fna.fbcdn.net/v/t39.30808-6/460714153_3896189997374451_8384798311454091103_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=0b6b33&_nc_ohc=B1kGYrgFcSwQ7kNvgFH4Ene&_nc_oc=Adl850wrZmqlafZMdEQPvuMQz7bGcs_newoA-01U9pkh0XaUnQJB-dKt3mBEdYzKE48&_nc_zt=23&_nc_ht=scontent.fdac99-1.fna&_nc_gid=WJSNH284SO8d2VypaEFUXA&oh=00_AYExwB9yNybIksVBBL_SeAsFUxc1TWaWeMEGRdpXwtJSdg&oe=67E98E4F";

        // Call the function to send the image prompt and get the response
        // const response = await sendImagePrompt(imageUrl);
        // console.log("Image prompt sent. Response:", response);

        console.log("Starting background removal process...");
        const processedImageUrl = await removeBackground(imageUrl);
        console.log("Background removed. Processed image URL:", processedImageUrl);

    } catch (error) {
        console.error("Error in main function:", error);
    }
}

main();