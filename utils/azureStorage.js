const { BlobServiceClient } = require("@azure/storage-blob");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const blobConection = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING
);

const getContainerAlbum = async () => {
  const containerAlbums = blobConection.getContainerClient("imgs-albums");
  containerAlbums.createIfNotExists();

  return containerAlbums;
};

const getContainerArtist = async () => {
  const containerArtist = blobConection.getContainerClient("imgs-artist");
  containerArtist.createIfNotExists();

  return containerArtist;
};

const uploadImageArtist = async (img, blobName) => {
  const containerArtist = await getContainerArtist();

  const blockBlobArtist = containerArtist.getBlockBlobClient(blobName);
  await blockBlobArtist.upload(img.buffer, img.buffer.length);
};

const uploadImageAlbum = async (img, blobName) => {
  const containerAlbums = await getContainerAlbum();

  const blockBlobAlbum = containerAlbums.getBlockBlobClient(blobName);
  await blockBlobAlbum.upload(img.buffer, img.buffer.length);
};

module.exports = { uploadImageAlbum, uploadImageArtist };
