import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from './routes/authRouter.js'
import cardsRouter from "./routes/cardsRouter.js";

dotenv.config({
  path: './envs/development.env'
});

export const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use('/api/users', authRouter)
app.use('/api/cards', cardsRouter)

app.use((_, res) => {
    res.status(404).json({ message: "Route not found" });
  });

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});