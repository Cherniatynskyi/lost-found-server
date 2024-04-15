import { UserModel } from "../models/userModel.js";
import dotenv from 'dotenv'
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import bcryptjs from "bcryptjs";

dotenv.config({
  path: './envs/development.env'
});

const {
    SECRET_KEY,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
  } = process.env;

export const checkIfUserExists = async (email) =>
  await UserModel.findOne({ email });

export const registerUserDB = async (userData) => {
    const user = new UserModel({ ...userData });
  
    await user.hashPassword();
  
    await user.save();
  
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "100h" });
  
    const newUser = await UserModel.findByIdAndUpdate(
      user._id,
      { token },
      { new: true }
    );
    const tokenActive = 100 * 60 * 60 * 1000;
  
    const expiresIn = new Date().getTime() + tokenActive;
  
    return { ...newUser.toObject(), expiresIn };
};

export const loginUserDB = async (userId) => {
    const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: "100h" });
  
    const newUser = await UserModel.findByIdAndUpdate(
      userId,
      { token },
      { new: true }
    );
  
    const tokenActive = 100 * 60 * 60 * 1000;
  
    const expiresIn = new Date().getTime() + tokenActive;
  
    return { ...newUser.toObject(), expiresIn };
  };
  

export const logoutUserDB = async (userId, token) => {
    const user = await UserModel.findByIdAndUpdate(userId, token);
    return user;
  };


export const saveAvatar = async (tmpUpload, _id) => {
    cloudinary.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
    });
    const result = await cloudinary.uploader.upload(tmpUpload);
    return result.url;
};


export const updateUserData = async (userId, updatedData) => {
    if (updatedData.password) {
      updatedData.password = await bcryptjs.hash(updatedData.password, 10);
    }
  
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });
  
    updatedUser.password = undefined;
    return updatedUser || null;
  };

