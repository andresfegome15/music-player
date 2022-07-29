const { Album } = require("../models/albums.models");
const { Artist } = require("../models/artist.model");
const { Song } = require("../models/song.model");
const { User } = require("../models/user.models");
const { FavoriteSong } = require("../models/favoriteSong.model");

//utils
const { catchAsync } = require("../utils/catchAsync.utils");
const { GlobalError } = require("../utils/ErrorGlobal.utils");

const userExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id, status: "active" } });
  if (!user) {
    return next(new GlobalError("User no founding", 403));
  }

  req.user = user;
  next();
});

const artistExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const artist = await Artist.findOne({ where: { id, status: "active" } });
  if (!artist) {
    return next(new GlobalError("artist no found", 404));
  }

  req.artist = artist;
  next();
});

const albumExist = catchAsync(async (req, res, next) => {
  const { albumId } = req.params;
  const album = await Album.findOne({
    where: { id: albumId, status: "active" },
  });
  if (!album) {
    return next(new GlobalError("Album no found", 404));
  }
  req.album = album;
  next();
});

const songExist = catchAsync(async (req, res, next) => {
  const { id, songId } = req.params;
  console.log("este es valor inicial" + id + songId);
  let idSong = 0;
  id !== undefined ? (idSong = id) : (idSong = songId);
  console.log("este es valor de id " + idSong);
  const song = await Song.findOne({ where: { id: idSong, status: "active" } });
  if (!song) {
    return next(new GlobalError("song no found", 404));
  }
  req.song = song;
  next();
});

const favoriteSongExist = catchAsync(async (req, res, next) => {
  const { songId } = req.params;
  const favoriteSong = await FavoriteSong.findOne({
    where: { songId, favorite: true },
  });
  if (!favoriteSong) {
    req.favoriteSong = favoriteSong;
  } else {
    req.favoriteSong = favoriteSong;
  }
  next();
});

module.exports = {
  userExist,
  artistExist,
  albumExist,
  songExist,
  favoriteSongExist,
};
