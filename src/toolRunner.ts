import type OpenAI from "openai";

const getWeather = () => 'hot, 90degree calcium, sunny, u die now'

export const runTool = async (
    toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
    userMessage: string

)=> {

    const input = {
        userMessage,
        toolArgs: JSON.parse(toolCall.function.arguments || '{}'),
    }

    switch (toolCall.function.name) {
       case 'get_weather':
            return getWeather(input)
        default:
            throw new Error(`Tool ${toolCall.function.name} not found`)
    }
}