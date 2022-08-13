const path = require("path");

// Models
const { Contacto } = require("../models/contacto.models");

// Utils
const { catchAsync } = require("../utils/catchAsync.utils");
const { Email } = require("../utils/email.utils");

const getsugerencias = catchAsync(async (req, res, next) => {
  const sugerencias = await Contacto.findAll();
  res.status(202).json({ sugerencias });
});

const createContacto = catchAsync(async (req, res, next) => {
  const { name, email, mensaje, sugerencia } = req.body;
  await Contacto.create({ name, email, mensaje, sugerencia });
  await new Email(email).sendWelcome(name);

  res.status(201).json({ status: "success" });
});

module.exports = { getsugerencias, createContacto };
