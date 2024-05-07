import { BlobServiceClient } from '@azure/storage-blob';

export default async function handler(req, res) {
  const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.NEXT_PUBLIC_AZURE_STORAGE_CONNECTION_STRING);
  const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_CONTAINER_NAME);
  let blobList = [];
  for await (const blob of containerClient.listBlobsFlat()) {
    blobList.push(blob);
  }
  res.status(200).json(blobList);
}