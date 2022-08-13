const { db, DataTypes } = require("../utils/db");

const Contacto = db.define("Contacto", {
  id: {
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  mensaje: { type: DataTypes.STRING, allowNull: false },
  sugerencia: { type: DataTypes.STRING },
});

module.exports = { Contacto };
