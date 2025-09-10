import express from "express";

const router = express.Router();

import {
  nearbyStation,
  getStationByCity,
} from "../controllers/station.controller.js";
router.get("/nearby", nearbyStation);
router.get("/", getStationByCity);

export default router;
