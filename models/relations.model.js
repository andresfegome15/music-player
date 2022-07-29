const { Album } = require("./albums.models");
const { Artist } = require("./artist.model");
const { User } = require("./user.models");
const { FavoriteSong } = require("./favoriteSong.model");
const { Song } = require("./song.model");

const relationModels = () => {
  User.hasMany(FavoriteSong, { foreignKey: "userId" });
  FavoriteSong.hasMany(User, { foreignKey: "id" });

  Song.hasMany(FavoriteSong, { foreignKey: "songId" });
  FavoriteSong.hasMany(Song, { foreignKey: "id" });

  Album.hasMany(Song, { foreignKey: "albumId" });
  Song.belongsTo(Album);

  Artist.hasMany(Album, { foreignKey: "artistId" });
  Album.belongsTo(Artist);
};

module.exports = { relationModels };
