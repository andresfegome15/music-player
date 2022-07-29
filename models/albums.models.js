const { db, DataTypes } = require("../utils/db");

const Album = db.define("album", {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  artistId: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  genre: { type: DataTypes.STRING, allowNull: false },
  imgUrl: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING, allowNull: false, defaultValue: "active" },
});

module.exports = { Album };
