import express from "express";
import { verifyAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

import {
  nearbyStation,
  getStationByCity,
} from "../controllers/station.controller.js";
router.get("/nearby", nearbyStation);
router.get("/", getStationByCity);

import {
  addComment,
  deleteComment,
} from "../controllers/comment.controller.js";
router.post("/addcomment", verifyAuth, addComment);
router.delete("/deletecomment", verifyAuth, deleteComment);

export default router;
