const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const path = require("path");

//init express
const app = express();

//utils json
app.use(express.json());

//midleware
const { ErrorHandler } = require("./middleware/handlerError.midleware");

//utils
const { GlobalError } = require("./utils/ErrorGlobal.utils");

//Router
const { userRouter } = require("./router/user.router");
const { artistRouter } = require("./router/artist.router");
const { homeRouter } = require("./router/home.router");
const { songRouter } = require("./router/song.router");

// Set template engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

// Limit the number of requests that can be accepted to our server
const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000, // 1 hr
  message: "Number of requests have been exceeded",
});

app.use(limiter);

// Add security headers
app.use(helmet());

// Compress responses
app.use(compression());

// Log incoming requests
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
else app.use(morgan("combined"));

//endpoints
app.use("/", homeRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/artist", artistRouter);
app.use("/api/v1/songs", songRouter);

//endponit no found
app.all("*", (req, res, next) => {
  next(
    new GlobalError(
      `${req.method} ${req.originalUrl} not found in this server`,
      404
    )
  );
});

app.use(ErrorHandler);
module.exports = { app };
