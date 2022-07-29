const { Artist } = require("../models/artist.model");
const { Album } = require("../models/albums.models");

//utils
const { GlobalError } = require("../utils/ErrorGlobal.utils");
const { catchAsync } = require("../utils/catchAsync.utils");
const {
  uploadImageAlbum,
  uploadImageArtist,
} = require("../utils/azureStorage");

const getArtist = catchAsync(async (req, res, next) => {
  const artist = await Artist.findAll({
    where: { status: "active" },
    include: [{ model: Album, where: { status: "active" }, required: false }],
  });
  res.status(200).json({ artist });
});

const createArtist = catchAsync(async (req, res, next) => {
  const { name, genre } = req.body;
  const blobName = `${Date.now()}_${req.file.originalname}`;
  const artist = await Artist.create({ name, genre, imgUrl: blobName });
  await uploadImageArtist(req.file, blobName);
  res.status(201).json({ artist });
});

const updateArtist = catchAsync(async (req, res, next) => {
  const { artist } = req;
  const { name, genre } = req.body;
  await artist.update({ name, genre });
  res.status(202).json({ status: "success", artist });
});
const deleteArtist = catchAsync(async (req, res, next) => {
  const { artist } = req;
  await artist.update({ status: "inactive" });
  res.status(202).json({ status: "success" });
});

const creataAlbum = catchAsync(async (req, res, next) => {
  const { title, genre } = req.body;
  const { artistId } = req.params;
  const blobName = `${Date.now()}_${req.file.originalname}`;
  const album = await Album.create({
    title,
    genre,
    artistId,
    imgUrl: blobName,
  });

  await uploadImageAlbum(req.file, blobName);
  res.status(201).json(album);
});

module.exports = {
  getArtist,
  createArtist,
  updateArtist,
  deleteArtist,
  creataAlbum,
};
