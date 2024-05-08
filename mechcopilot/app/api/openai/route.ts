import { OpenAIClient, AzureKeyCredential } from "@azure/openai";


export interface IChatGPTPayload {
  prompt: string;
}

/**
 * A simple function that makes a request to the Azure Open AI API.
 */
const simpleOpenAIRequest = async (payload: IChatGPTPayload) => {

  const client = new OpenAIClient(process.env.AZURE_OPEN_AI_BASE, new AzureKeyCredential(process.env.AZURE_OPEN_AI_KEY));
  const deploymentId = "gpt-35-turbo";
  var chatCompletion;
  const result = await client.getChatCompletions(deploymentId, [
    { role: "system", content: "You are a helpful aircraft manual assistant. You deliver concise data and links to relevant documentation." },
    { role: "user", content: "Can you help me?" },
    { role: "assistant", content: "How can I help you?" },
    { role: "user", content: "What's the name of the federal aircraft maintenance manual?" },
  ]);
  for (const choice of result.choices) {
    chatCompletion =choice.message?.content;
  }
  console.dir(chatCompletion, { depth: null })
  return chatCompletion; // return the response from the AI, make sure to handle error cases
};

/**
 * Main entry point for the API.
 **/

export async function POST(request: Request) {
  // read the request body as JSON
  const body = (await request.json()) as IChatGPTPayload;

  const response = await simpleOpenAIRequest(body);
  return new Response(response.toString()); // Convert the ChatCompletionMessage to a string
}
