const express = require("express");
const {
  getsugerencias,
  createContacto,
} = require("../controller/contacto.controller");

const contactoRouter = express.Router();

contactoRouter.get("/", getsugerencias);
contactoRouter.post("/", createContacto);

module.exports = { contactoRouter };
