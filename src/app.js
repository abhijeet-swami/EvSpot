import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

import authRouter from "./routes/auth.route.js";
app.use("/api/v1/auth", authRouter);

import userRouter from "./routes/user.route.js";
app.use("/api/v1/user", userRouter);

export default app;
