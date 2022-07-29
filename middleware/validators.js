const { body, validationResult } = require("express-validator");

const { GlobalError } = require("../utils/ErrorGlobal.utils");

const resultChecked = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const msgError = error.array().map(err => err.msg);

    const messeger = msgError.join(". ");
    return next(new GlobalError(messeger, 400));
  }
  next();
};

const createUserValidator = [
  body("name").notEmpty().withMessage("name cannot be null"),
  body("email")
    .notEmpty()
    .withMessage("Email cannot be null")
    .isEmail()
    .withMessage("Email dont have email format"),
  body("password")
    .notEmpty()
    .withMessage("password cannot be null")
    .isAlphanumeric()
    .withMessage("password is alphanumeric")
    .isLength({ min: 8 })
    .withMessage("password min 8 character long"),
  resultChecked,
];

const updateUserValidator = [
  body("name").notEmpty().withMessage("name cannot be null"),
  body("email")
    .notEmpty()
    .withMessage("Email cannot be null")
    .isEmail()
    .withMessage("Email dont have email format"),
  resultChecked,
];

const createArtistValidator = [
  body("name").notEmpty().withMessage("name cannot be null"),
  body("genre").notEmpty().withMessage("Genre cannot be null"),
  resultChecked,
];

const updateArtistValidator = [
  body("name").notEmpty().withMessage("name cannot be null"),
  resultChecked,
];

const createAlbumtValidator = [
  body("title").notEmpty().withMessage("title cannot be null"),
  body("genre").notEmpty().withMessage("Genre cannot be null"),
  resultChecked,
];

const createSongtValidator = [
  body("title").notEmpty().withMessage("title cannot be null"),
  resultChecked,
];

const updateSongtValidator = [
  body("title").notEmpty().withMessage("title cannot be null"),
  resultChecked,
];

module.exports = {
  createUserValidator,
  updateUserValidator,
  createArtistValidator,
  updateArtistValidator,
  createAlbumtValidator,
  createSongtValidator,
  updateSongtValidator,
};
