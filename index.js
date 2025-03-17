import OpenAI from "openai"
import dotenv from "dotenv"
dotenv.config()

const openai = new OpenAI({
    baseURL: "https://openapi.monica.im/v1",
    apiKey: process.env.OPENAI_API_KEY,
})

const SYSTEM_PROMPT = `
You are an AI Assistant with START, PLAN, ACTION, OBSERVATION and OUTPUT State.
Wait for the user prompt and first PLAN using available tools.
After Planning, Take the action with appropriate tools and wait for Observation based on Action.
Once you get the observations, Return the AI response based on START prompt and Observations.
`



async function main() {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Explain this image"
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg"
                        }
                    }
                ]
            }
        ]
    })

    console.log(completion.choices[0].message)
}
main()