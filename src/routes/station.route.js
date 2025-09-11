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
router.post("/addcomment", verifyAuth, addComment);
router.delete("/deletecomment", verifyAuth, deleteComment);

import { addRating, updateRating } from "../controllers/rating.controller.js";
router.post("/addrating", verifyAuth, addRating);
router.put("/updaterating", verifyAuth, updateRating);

export default router;
