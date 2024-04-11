import { Schema, model } from "mongoose";
import { readFile } from 'fs/promises';

const json = JSON.parse(
    await readFile(
      new URL('../utils/ua.json', import.meta.url)
    )
  );

export const cities = json.map(el => el.city)


const types = ['lost', 'found']

const cardSchema = new Schema(
    {
      type: {
        type: String,
        required: true,
        enum: types
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true,
        enum: cities
      },
      date: {
        type: Date,
        required: true
      },
      price:{
        type: String,
      },
      photo_url: { type: String, default: "" },   
    },
    { versionKey: false }
  );
  
  export const CardModel = model("Card", cardSchema);