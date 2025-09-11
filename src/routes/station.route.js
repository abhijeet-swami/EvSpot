import express from "express";
import { verifyAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

import {
  nearbyStation,
  getStationByCity,
  fetchStation,
} from "../controllers/station.controller.js";
router.get("/nearby", nearbyStation);
router.get("/", getStationByCity);
router.get("/get/station", fetchStation);

import {
  addComment,
  deleteComment,
} from "../controllers/comment.controller.js";
router.post("/add/comment", verifyAuth, addComment);
router.delete("/delete/comment", verifyAuth, deleteComment);

import { addRating, updateRating } from "../controllers/rating.controller.js";
router.post("/add/rating", verifyAuth, addRating);
router.put("/update/rating", verifyAuth, updateRating);

export default router;
