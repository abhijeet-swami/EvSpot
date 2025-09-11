import asyncWrapper from "../utils/asyncWrapper.util.js";
import sendResponse from "../utils/sendResponse.util.js";
import AppError from "../utils/AppError.util.js";
import User from "../models/user.model.js";
import { Station } from "../models/station.model.js";

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

const favStation = asyncWrapper(async (req, res) => {
  const { station_id } = req.body;
  if (!station_id || station_id.trim() === "") {
    throw new AppError("Station Id required!", 400);
  }

  const station = await Station.exists({ _id: station_id });
  if (!station) {
    throw new AppError("Station not found!", 400);
  }

  const user = await User.findById(req._id);
  if (user.favoriteStations.includes(station_id)) {
    user.favoriteStations.pull(station_id);
    await user.save();
    sendResponse(res, 200, "Removed station from current list");
  } else {
    user.favoriteStations.push(station_id);
    await user.save();
    sendResponse(res, 201, "Added station to current list");
  }
});

export { fetchUserProfile, favStation };
