import express from "express";

const app = express();

app.use(express.json());

import authRouter from "./routes/auth.route.js";
app.use("/api/v1/auth", authRouter);

export default app;
