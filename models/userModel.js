import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new Schema(
    {
      name: {
        type: String,
        required: [true, "Set name for user"],
      },
      password: {
        type: String,
        required: [true, "Set password for user"],
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
      },
      avatarURL: { type: String, default: "" },
      token: { type: String, default: "" },
    },
    { versionKey: false, timestamps: false }
  );
  
  userSchema.methods.hashPassword = async function () {
    this.password = await bcryptjs.hash(this.password, 10);
  };
  
  userSchema.methods.comparePassword = async function (userPassword) {
    return await bcryptjs.compare(userPassword, this.password);
  };
  
  export const UserModel = model("User", userSchema);