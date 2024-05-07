import { TextAnalyticsClient, AzureKeyCredential } from "@azure/ai-text-analytics";

export default async function handler(req, res) {
  const message = req.body.message;

  const client = new TextAnalyticsClient(process.env.AZURE_ENDPOINT, new AzureKeyCredential(process.env.AZURE_API_KEY));
  const response = await client.analyzeSentiment([message]);

  res.json({ response: response[0].sentiment });
}