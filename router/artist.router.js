const express = require("express");

const artistRouter = express.Router();

const { imgUpload } = require("../utils/imgUpload");

//middleware
const { seccionProteted } = require("../middleware/protectedSeccion");
const { artistExist } = require("../middleware/testingExist");
const {
  createAlbumtValidator,
  updateArtistValidator,
  createArtistValidator,
} = require("../middleware/validators");

//controller
const {
  getArtist,
  createArtist,
  updateArtist,
  deleteArtist,
  creataAlbum,
} = require("../controller/artist.controller");

//endpoints
artistRouter.get("/", getArtist);

artistRouter.use(seccionProteted);
artistRouter.post(
  "/",
  imgUpload.single("artistImg"),
  createArtistValidator,
  createArtist
);
artistRouter.post(
  "/albums/:artistId",
  imgUpload.single("albumImg"),
  createAlbumtValidator,
  creataAlbum
);

artistRouter
  .use("/:id", artistExist)
  .route("/:id")
  .patch(updateArtistValidator, updateArtist)
  .delete(deleteArtist);

module.exports = { artistRouter };
