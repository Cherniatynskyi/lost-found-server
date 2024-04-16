import { HttpError } from "../helpers/HttpError.js";
import { CardModel } from "../models/cardModel.js";

export const getAllLost = async (req) => {
    const {page=1, limit=10} = req.query
    const skip = (page-1) * limit
    const cards = await CardModel.find({type:"lost"}, "" ,{skip, limit});
  
    if (!cards) {
      throw HttpError(404);
    }
  
    return cards;
};

export const getAllFound = async (req) => {
  const {page=1, limit=10} = req.query
  const skip = (page-1) * limit
  const cards = await CardModel.find({type: "found"}, "" ,{skip, limit});

  if (!cards) {
    throw HttpError(404);
  }

  return cards;
};

export const getOwnerCards = async (owner, req) => {
    const {page=1, limit=10} = req.query
    const skip = (page-1) * limit

    if(`${req.user._id}` !== req.params.ownerId){
      throw HttpError(401);
    }

    const cards = await CardModel.find({owner}, "", {skip, limit});
  
    if (!cards) {
      throw HttpError(404);
    }
  
    return cards;
};
  
export const addCards = async (owner, data) => {
    const newCard = await CardModel.create({ ...data, owner });
    return newCard;
};
  
export const updateCard = async (id, owner, data) => {
    const updatedCard = await CardModel.findOneAndUpdate(
      {
        _id: id,
        owner,
      },
      data,
      {
        new: true,
      }
    );
  
    return updatedCard;
};
  
export const removeCard = async (id, owner) => {
    const deletedCard = await CardModel.findOneAndDelete({ _id: id, owner });
    return deletedCard;
  };
  