/* jshint esversion: 6 */
import { BlobServiceClient } from '@azure/storage-blob';

import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  await upload.single('file')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.NEXT_PUBLIC_AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_CONTAINER_NAME);
    const blockBlobClient = containerClient.getBlockBlobClient(req.file.originalname);

    const uploadBlobResponse = await blockBlobClient.uploadFile(req.file.path);
    res.status(200).json({ message: 'File uploaded to Azure Blob Storage', uploadBlobResponse });
  });
}