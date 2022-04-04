import asyncHandler from "express-async-handler";

// @desc   Authenticate User
// @route  GET api/user
// @access Public
const authenticateUser = asyncHandler(async (req, res) => {
  res.status(200).json({message: "Authenticate User"});
});

// @desc   Register User
// @route  GET api/user
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({message: "Register User"});
});

// @desc   Logout User
// @route  GET api/user
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({message: "Logout User"});
});

export {authenticateUser, registerUser, logoutUser}
