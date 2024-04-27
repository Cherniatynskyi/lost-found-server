import { HttpError } from "../helpers/HttpError.js";
import { CardModel } from "../models/cardModel.js";

export const getAllLost = async (req) => {
    const {page=1, limit=10, location, category} = req.query
    const skip = (page-1) * limit


    if((location==='all') & (category !== "all")){
      const cards = await CardModel.find({type: "lost", category}, "" ,{skip, limit});
      return cards
    }
    if((category==='all') & (location !== "all")){
      const cards = await CardModel.find({type: "lost", location}, "" ,{skip, limit});
      return cards
    }
    if((category==='all') & (location==='all')){
      const cards = await CardModel.find({type: "lost"}, "" ,{skip, limit});
      return cards
    }
    const cards = await CardModel.find({type: "lost", location, category}, "" ,{skip, limit});
  
    if (!cards) {
      throw HttpError(404);
    }
  
    return cards;
};

export const getAllFound = async (req) => {
  const {page=1, limit=10,  location, category} = req.query
  const skip = (page-1) * limit
  if((location==='all') & (category !== "all")){
    const cards = await CardModel.find({type: "found", category}, "" ,{skip, limit});
    return cards
  }
  if((category==='all') & (location !== "all")){
    const cards = await CardModel.find({type: "found", location}, "" ,{skip, limit});
    return cards
  }
  if((category==='all') & (location==='all')){
    const cards = await CardModel.find({type: "found"}, "" ,{skip, limit});
    return cards
  }
  const cards = await CardModel.find({type: "found", location, category}, "" ,{skip, limit});

  if (!cards) {
    throw HttpError(404);
  }

  return cards;
};

export const getOwnerCards = async (owner, req) => {
    const {page=1, limit=10} = req.query
    const skip = (page-1) * limit

    console.log(req, "AAAAAAA")

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
  