import User from "../models/user.model.js";
import asyncWrapper from "../utils/asyncWrapper.util.js";
import AppError from "../utils/AppError.util.js";
import sendResponse from "../utils/sendResponse.util.js";

const register = asyncWrapper(async (req, res) => {
  const { fullName, username, email, password } = req.body;
  if (
    [fullName, username, email, password].some((field) => field.trim() === "")
  ) {
    throw new AppError("All fields are required!", 400);
  }

  try {
    const user = new User({
      fullName,
      username,
      email,
      password,
    });
    await user.save();
    const data = {
      fullName: user.fullName,
      username: user.username,
      email: user.email,
    };
    sendResponse(res, 201, "User registered successfully", data);
  } catch (err) {
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      throw new AppError(`${field} already taken!`, 400);
    }
    throw err;
  }
});

const login = asyncWrapper(async (req, res) => {
  const { username, password } = req.body;
  if ([username, password].some((field) => field.trim() === "")) {
    throw new AppError("All fields are required", 400);
  }

  const user = await User.findOne({ username });
  if (!user) throw new AppError("User not exist", 400);

  const isCorrectPassword = await user.verifyPassword(password);
  if (!isCorrectPassword)
    throw new AppError("Incorrect username or password!", 400);

  const data = {
    fullName: user.fullName,
    username: user.username,
    email: user.email,
  };

  sendResponse(res, 200, "Login successfully", data);
});

export { register, login };
