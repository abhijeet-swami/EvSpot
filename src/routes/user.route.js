import express from "express";

const router = express.Router();

import { verifyAuth } from "../middlewares/auth.middleware.js";
import { fetchUserProfile } from "../controllers/user.controller.js";

router.get("/me", verifyAuth, fetchUserProfile);

import { favStation } from "../controllers/user.controller.js";
router.post("/favorite", verifyAuth, favStation);

export default router;
