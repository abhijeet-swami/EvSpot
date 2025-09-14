import asyncWrapper from "../utils/asyncWrapper.util.js";
import sendResponse from "../utils/sendResponse.util.js";
import AppError from "../utils/AppError.util.js";
import { Station } from "../models/station.model.js";
import { Rating } from "../models/rating.model.js";

const addRating = asyncWrapper(async (req, res) => {
  const { ratingCount, station_id } = req.body;
  if (!ratingCount || !station_id) {
    throw new AppError("Fields required", 400);
  }

  const isStationExists = await Station.exists({ _id: station_id });
  if (!isStationExists) {
    throw new AppError("Station not exists!", 400);
  }

  const rating = new Rating({
    rating: parseInt(ratingCount),
    user: req._id,
    station: station_id,
  });
  await rating.save();

  sendResponse(res, 201, "Rating added!", rating._id);
});

const updateRating = asyncWrapper(async (req, res) => {
  const { rating_id, ratingCount } = req.body;
  if (!rating_id || rating_id.trim() === "" || !ratingCount) {
    throw new AppError("rating id required", 400);
  }

  const isRating = await Rating.findById(rating_id);
  if (!isRating) {
    throw new AppError("Rating does not exists", 400);
  }

  if (!isRating.user.equals(req._id)) {
    throw new AppError("Not authorized to update this rating", 403);
  }

  isRating.rating = parseInt(ratingCount);
  isRating.updated = true;
  await isRating.save();

  sendResponse(res, 200, "Rating updated!");
});

export { addRating, updateRating };
