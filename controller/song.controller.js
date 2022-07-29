const { Album } = require("../models/albums.models");
const { Song } = require("../models/song.model");
const { FavoriteSong } = require("../models/favoriteSong.model");

const { GlobalError } = require("../utils/ErrorGlobal.utils");
const { catchAsync } = require("../utils/catchAsync.utils");
const { Artist } = require("../models/artist.model");

const getsongsbyalbumid = catchAsync(async (req, res, next) => {
  const { albumId } = req.params;
  const song = await Song.findAll({
    where: { albumId, status: "active" },
    include: [
      {
        required: false,
        model: Album,
        attributes: ["title"],
        where: { status: "active" },
        include: [
          {
            required: false,
            model: Artist,
            attributes: ["name"],
            where: { status: "active" },
          },
        ],
      },
    ],
  });
  res.status(200).json({ status: "success", song });
});

const createSong = catchAsync(async (req, res, next) => {
  const { album } = req;
  const { title } = req.body;
  const song = await Song.create({ title, albumId: album.id });
  res.status(201).json({ song });
});

const updateSong = catchAsync(async (req, res, next) => {
  const { title } = req.body;
  const { song } = req;
  await song.update({ title });
  res.status(202).json({ status: "update", song });
});

const deleteSong = catchAsync(async (req, res, next) => {
  const { song } = req;
  await song.update({ status: "inactive" });
  res.status(202).json({ status: "delete" });
});

const addFavoriteSong = catchAsync(async (req, res, next) => {
  const { songId } = req.params;
  const { seccionUser, favoriteSong } = req;
  if (!favoriteSong) {
    await FavoriteSong.create({
      userId: seccionUser.id,
      songId,
      favorite: true,
    });
    res.status(201).json({ status: "success" });
  } else {
    favoriteSong.destroy();
  }

  res.status(202).json({ status: "success" });
});

module.exports = {
  getsongsbyalbumid,
  createSong,
  updateSong,
  deleteSong,
  addFavoriteSong,
};
