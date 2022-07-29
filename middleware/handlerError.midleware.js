const dotenv = require("dotenv");

// Utils
const { GlobalError } = require("../utils/ErrorGlobal.utils");

dotenv.config({ path: "./config.env" });

const sendErrorDev = (err, req, res) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: "fail",
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, req, res) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: "fail",
    message: err.message || "Something went very wrong!",
  });
};

const handleUniqueEmailError = () => {
  return new GlobalError("The email you entered is already taken", 400);
};

const handleJWTExpiredError = () => {
  return new GlobalError("Your session has expired! Please login again.", 401);
};

const handleJWTError = () => {
  return new GlobalError("Invalid session. Please login again.", 401);
};

const ErrorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    if (err.name === "SequelizeUniqueConstraintError") {
      error = handleUniqueEmailError();
    } else if (err.name === "TokenExpiredError") {
      error = handleJWTExpiredError();
    } else if (err.name === "JsonWebTokenError") {
      error = handleJWTError();
    }

    sendErrorProd(error, req, res);
  }
};

module.exports = { ErrorHandler };
