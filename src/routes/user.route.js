import express from "express";

const router = express.Router();

import { verifyAuth } from "../middlewares/auth.middleware.js";
import { fetchUserProfile } from "../controllers/user.controller.js";

router.get("/me", verifyAuth, fetchUserProfile);

import { favStation, fetchFavStation } from "../controllers/user.controller.js";
router.post("/favorite", verifyAuth, favStation);
router.get("/get/favorite", verifyAuth, fetchFavStation);

export default router;
