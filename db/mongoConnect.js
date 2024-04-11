import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
    path: './envs/development.env'
  });

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connected successfully");
  } catch (error) {
    console.log(error);
  }
};