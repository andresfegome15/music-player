const express = require("express");

//controller
const { renderIndex } = require("../controller/home.controller");

const homeRouter = express.Router();

homeRouter.get("/", renderIndex);

module.exports = { homeRouter };
