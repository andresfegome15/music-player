const express = require("express");

//init router
const songRouter = express.Router();

//controller
const {
  createSong,
  updateSong,
  deleteSong,
  getsongsbyalbumid,
  addFavoriteSong,
} = require("../controller/song.controller");

//middleware
const { seccionProteted } = require("../middleware/protectedSeccion");
const {
  songExist,
  albumExist,
  favoriteSongExist,
} = require("../middleware/testingExist");
const {
  createSongtValidator,
  updateSongtValidator,
} = require("../middleware/validators");

songRouter.get("/:albumId", albumExist, getsongsbyalbumid);

songRouter.use(seccionProteted);
songRouter.post("/:albumId", albumExist, createSongtValidator, createSong);
songRouter.post(
  "/:favorite/:songId",
  songExist,
  favoriteSongExist,
  addFavoriteSong
);
songRouter
  .use("/:id", songExist)
  .route("/:id")
  .patch(updateSongtValidator, updateSong)
  .delete(deleteSong);

module.exports = { songRouter };
