const { User } = require("../models/user.models");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

//utils
const { catchAsync } = require("../utils/catchAsync.utils");
const { GlobalError } = require("../utils/ErrorGlobal.utils");
const { Email } = require("../utils/email.utils");

const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findAll();
  res.status(200).json({ status: "success", user });
});

const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(12);
  const incryPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: incryPassword });
  user.password = undefined;

  await new Email(email).sendWelcome(name);
  res.status(201).json({ user });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email, status: "active" } });
  if (!user) {
    return next(new GlobalError("credentials invalid", 404));
  }

  const passwordValid = await bcrypt.compare(password, user.password);

  if (!passwordValid) {
    return next(new GlobalError("credentials invalid", 404));
  }

  const token = await JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.status(201).json({ token });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { name, email } = req.body;
  await user.update({ name, email });
  user.password = "********";
  res.status(202).json({ user });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  await user.update({ status: "inactive" });
  res.status(202).json({ status: "success" });
});

module.exports = { getUser, createUser, login, updateUser, deleteUser };
