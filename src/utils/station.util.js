import AppError from "./AppError.util.js";
import { Station } from "../models/station.model.js";
import { Rating } from "../models/rating.model.js";

const checkCoordinates = (lat, lng, radius) => {
  if (!lat || !lng || !radius) {
    throw new AppError("lat, lng and radius are required", 400);
  }
  const latNum = parseFloat(lat);
  const lngNum = parseFloat(lng);
  const radiusNum = parseInt(radius);

  if (isNaN(latNum) || isNaN(lngNum) || isNaN(radiusNum)) {
    throw new AppError("lat, lng, and radius must be valid numbers", 400);
  }

  if (latNum < -90 || latNum > 90) {
    throw new AppError("Latitude must be between -90 and 90", 400);
  }

  if (lngNum < -180 || lngNum > 180) {
    throw new AppError("Longitude must be between -180 and 180", 400);
  }

  if (radiusNum <= 0) {
    throw new AppError("Radius must be greater than 0", 400);
  }

  return {
    lat: latNum,
    lng: lngNum,
    radius: radiusNum,
  };
};

const getRating = async (stationID) => {
  const rating = await Rating.find({ station: stationID }).select(
    "rating -_id",
  );
  let ratings = 0;
  rating.forEach((i) => (ratings += i.rating));
  return ratings;
};

export { checkCoordinates, getRating };
