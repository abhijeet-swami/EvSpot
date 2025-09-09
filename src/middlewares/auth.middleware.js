import User from "../models/user.model.js";
import AppError from "../utils/AppError.util.js";
import asyncWrapper from "../utils/asyncWrapper.util.js";
import { verifyToken } from "../utils/token.util.js";

const verifyAuth = asyncWrapper(async (req, res, next) => {
  const token = req.cookies?.uid;
  if (!token) {
    throw new AppError(
      "You are not logged in. Please log in to get access.",
      401,
    );
  }

  const decodedPayload = verifyToken(token);
  if (!decodedPayload) {
    throw new AppError(
      "Invalid token or token has expired. Please log in again.",
      401,
    );
  }

  const user = await User.findById(decodedPayload._id).select("-password");
  if (!user) {
    throw new AppError(
      "The user belonging to this token no longer exists.",
      401,
    );
  }

  req.user = user;

  next();
});

export { verifyAuth };
