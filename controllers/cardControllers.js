import { trycatchFunc } from "../helpers/trycatchFunc.js";
import { HttpError } from "../helpers/HttpError.js";
import * as cardServices from "../services/cardServices.js";

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

  const newCard = await cardServices.addCards(owner, body);

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

  if (!body || Object.keys(body).length === 0) {
    throw HttpError(400, "missing field");
  }

  const updatedCard = await cardServices.updateCard(id, owner, body);

  if (!updatedCard) {
    throw HttpError(404, `Card with id ${id} not found`);
  }

  res.json(updatedCard);
});
