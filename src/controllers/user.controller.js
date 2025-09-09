import asyncWrapper from "../utils/asyncWrapper.util.js";
import sendResponse from "../utils/sendResponse.util.js";
import AppError from "../utils/AppError.util.js";
import User from "../models/user.model.js";

const fetchUserProfile = asyncWrapper(async (req, res) => {
  const _id = req._id;

  const user = await User.findById(_id).select("-password");

  const data = {
    fullName: user.fullName,
    username: user.username,
    email: user.email,
  };

  sendResponse(res, 200, "", data);
});

export { fetchUserProfile };
