const multer = require("multer");

const load = multer.memoryStorage();

const imgUpload = multer({ load });

module.exports = { imgUpload };
