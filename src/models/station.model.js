import mongoose from "mongoose";

const stationSchema = new mongoose.Schema(
  {
    googleMapsId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    stationName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: mongoose.Types.ObjectId,
      ref: "Rating",
    },
    comment: {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
  },
  {
    timestamps: true,
  },
);

const Station = mongoose.model("Station", stationSchema);

export default Station;
