import User from "../models/user.model.js";
import asyncWrapper from "../utils/asyncWrapper.util.js";
import AppError from "../utils/AppError.util.js";
import sendResponse from "../utils/sendResponse.util.js";

const register = asyncWrapper(async (req, res) => {
  console.log(1);
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

export { register };
