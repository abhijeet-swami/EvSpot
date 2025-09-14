import mongoose from "mongoose";
import { getRating } from "../utils/station.util.js";
import { Station } from "./station.model.js";

const ratingSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    station: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Station",
      required: true,
    },
    updated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

ratingSchema.index({ user: 1, station: 1 }, { unique: true });

ratingSchema.post("save", async function () {
  try {
    const station = await Station.findById(this.station).select(
      "ratingCount averageRating",
    );
    const totalRatings = await getRating(this.station);

    if (!this.updated) {
      station.ratingCount += 1;
    }

    station.averageRating = totalRatings / station.ratingCount;
    await station.save();
  } catch (error) {
    console.log(error);
  }
});

export const Rating = mongoose.model("Rating", ratingSchema);
