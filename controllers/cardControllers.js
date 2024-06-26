import { trycatchFunc } from "../helpers/trycatchFunc.js";
import { HttpError } from "../helpers/HttpError.js";
import * as cardServices from "../services/cardServices.js";
import * as authServices from '../services/authServices.js'

export const getAllLost = trycatchFunc(async (req, res) => {
  const cards = await cardServices.getAllLost(req);

  res.json(cards);
});

export const getAllFound = trycatchFunc(async (req, res) => {
    const cards = await cardServices.getAllFound(req);
  
    res.json(cards);
  });

export const getOwnerCards = trycatchFunc(async (req, res) => {
    const { ownerId: owner } = req.params;
    const cards = await cardServices.getOwnerCards(owner, req);
  
    res.json(cards);
  });

export const createCard = trycatchFunc(async (req, res) => {
  const { _id: owner } = req.user;
  const { body } = req;
  let photo_url

  if (req.file) {
    const { path: tmpUpload } = req.file;
    photo_url = await authServices.saveAvatar(tmpUpload);
  }

  const newCard = await cardServices.addCards(owner, {...body, photo_url});

  res.status(201).json(newCard);
});

export const deleteCard = trycatchFunc(async (req, res) => {
  const id = req.params.cardId;
  const { _id: owner } = req.user;

  const card = await cardServices.removeCard(id, owner);

  if (!card) {
    throw HttpError(404, `Card with id ${id} not found`);
  }

  res.json({ message: "Card deleted successfully" });
});

export const updateCardCtrl = trycatchFunc(async (req, res) => {
  const id = req.params.cardId;
  const { body } = req;
  const { _id: owner } = req.user;

  let photo_url

  if (req.file) {
    const { path: tmpUpload } = req.file;
    photo_url = await authServices.saveAvatar(tmpUpload);
  }

  const updatedCard = await cardServices.updateCard(id, owner, body);

  if (!updatedCard) {
    throw HttpError(404, `Card with id ${id} not found`);
  }

  res.json(updatedCard);
});
