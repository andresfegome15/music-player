const express = require("express");

const userRouter = express.Router();

//middleware
const {
  seccionProteted,
  compareUser,
} = require("../middleware/protectedSeccion");
const { userExist } = require("../middleware/testingExist");
const {
  createUserValidator,
  updateUserValidator,
} = require("../middleware/validators");

//controller
const {
  getUser,
  createUser,
  login,
  updateUser,
  deleteUser,
} = require("../controller/user.controller");

//endpoints

userRouter.post("/", createUserValidator, createUser);
userRouter.post("/login", login);

// userRouter.use(seccionProteted);
userRouter.get("/", getUser);
userRouter
  .use("/:id", compareUser, userExist)
  .route("/:id")
  .patch(updateUserValidator, updateUser)
  .delete(deleteUser);

module.exports = { userRouter };
