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

  const isvalidToken = verifyToken(token);
  if (!isvalidToken) {
    throw new AppError(
      "Invalid token or token has expired. Please log in again.",
      401,
    );
  }

  const userExists = await User.exists({ _id: isvalidToken._id });
  if (!userExists) {
    throw new AppError(
      "The user belonging to this token no longer exists.",
      401,
    );
  }

  req._id = isvalidToken._id;

  next();
});

export { verifyAuth };
