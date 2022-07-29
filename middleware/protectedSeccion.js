//librery
const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

//models
const { User } = require("../models/user.models");

//utils
const { GlobalError } = require("../utils/ErrorGlobal.utils");
const { catchAsync } = require("../utils/catchAsync.utils");

const seccionProteted = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new GlobalError("seccion invalid", 404));
  }
  const decode = await JWT.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({
    where: { id: decode.id, status: "active" },
  });

  if (!user) {
    return next(new GlobalError("user is not enabled", 404));
  }
  console.log(user.id);
  req.seccionUser = user;
  next();
});

const compareUser = catchAsync(async (req, res, next) => {
  const { seccionUser } = req;
  const { id } = req.params;
  console.log(seccionUser.id);
  console.log(id);
  if (seccionUser.id !== parseInt(id)) {
    return next(new GlobalError("User no valid", 403));
  }
  next();
});

module.exports = { compareUser, seccionProteted };
