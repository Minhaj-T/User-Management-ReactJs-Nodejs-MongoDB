const asyncHandler = require("express-async-handler");
const User = require("../models/usermodel");
const generateToken = require("../utils/generateTocken");

//Load input validation
const validateRegisterForm = require("../validation/register");
const validateLoginForm = require("../validation/login");

//user rgistation form
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const { errors, isValid } = await validateRegisterForm(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    errors.email = "This is Email is already Exist";
    return res.status(400).json(errors);
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("new error");
  }
});

//user login form
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { errors, isValid } = validateLoginForm(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  let user = await User.findOne({ email });
  if (user) {
    let notMatch = await user.matchPassword(password);
    if (notMatch) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      errors.password = "Password inccorrest";
      res.status(400).json(errors);
    }
  } else {
    errors.email = "User not found";
    res.status(400).json(errors);
  }
});

//get the all users
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

//delete user 
const deleteUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.query.id);
    await user.remove();
    res.json({});
  } catch (error) {
    res.json(error);
  }
});

//get a user 
const getuser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

//update a user details
const updateUser = asyncHandler(async (req, res) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };
    const user = await User.findByIdAndUpdate(req.params.userId, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  registerUser,
  authUser,
  getAllUsers,
  deleteUser,
  getuser,
  updateUser,
};
