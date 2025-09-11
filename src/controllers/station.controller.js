import asyncWrapper from "../utils/asyncWrapper.util.js";
import sendResponse from "../utils/sendResponse.util.js";
import AppError from "../utils/AppError.util.js";
import { Station } from "../models/station.model.js";
import { checkCoordinates } from "../utils/station.util.js";

const nearbyStation = asyncWrapper(async (req, res) => {
  const { lat, lng, radius } = checkCoordinates(
    req.query?.lat,
    req.query?.lng,
    req.query?.radius,
  );

  const stations = await Station.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat],
        },
        $maxDistance: radius,
      },
    },
  });

  sendResponse(res, 200, "Nearby stations fetched successfully", stations);
});

const getStationByCity = asyncWrapper(async (req, res) => {
  const city = req.query?.city;
  if (!city || city.trim() === "") {
    throw new AppError("City name required!", 400);
  }

  const stations = await Station.find({
    city: { $regex: city, $options: "i" },
  });

  sendResponse(res, 200, `Stations in ${city} fetched successfully`, stations);
});

const fetchStation = asyncWrapper(async (req, res) => {
  const id = req.query?.id;
  if (!id || id.trim() === "") {
    throw new AppError("Station id required!", 400);
  }

  const station = await Station.findById(id);
  if (!station) {
    throw new AppError("Station not found!", 400);
  }

  sendResponse(res, 200, "Station details", station);
});

export { nearbyStation, getStationByCity, fetchStation };
