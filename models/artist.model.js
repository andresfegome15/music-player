const { db, DataTypes } = require("../utils/db");

const Artist = db.define("artist", {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  genre: { type: DataTypes.STRING, allowNull: false },
  imgUrl: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING, allowNull: false, defaultValue: "active" },
});

module.exports = { Artist };
