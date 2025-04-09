import 'dotenv/config'
import { runLLM } from './src/llm.js'

const userMessage = process.argv[2]

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}


(async () => {
  const response = await runLLM({userMessage})
  console.log(response)
})();
