const { db, DataTypes } = require("../utils/db");

const Song = db.define("song", {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  title: { type: DataTypes.STRING, allowNull: false },
  albumId: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false, defaultValue: "active" },
});

module.exports = { Song };
