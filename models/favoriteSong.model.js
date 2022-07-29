const { db, DataTypes } = require("../utils/db");

const FavoriteSong = db.define("favoriteSong", {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  songId: { type: DataTypes.INTEGER, allowNull: false },
  favorite: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
});

module.exports = { FavoriteSong };
