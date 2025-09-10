import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

import authRouter from "./routes/auth.route.js";
app.use("/api/v1/auth", authRouter);

import userRouter from "./routes/user.route.js";
app.use("/api/v1/user", userRouter);

import stationRouter from "./routes/station.route.js";
app.use("/api/v1/station", stationRouter);

export default app;
