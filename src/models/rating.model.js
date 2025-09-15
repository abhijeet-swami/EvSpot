import mongoose from "mongoose";
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
  },
  {
    timestamps: true,
  },
);

ratingSchema.index({ user: 1, station: 1 }, { unique: true });

export const Rating = mongoose.model("Rating", ratingSchema);
