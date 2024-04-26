import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { validateBody } from "../middlewares/validateBody.js";
import * as schemas from "../schemas/cardSchema.js";
import * as cardServices from "../controllers/cardControllers.js";
import upload from "../middlewares/upload.js";



const cardsRouter = express.Router();

cardsRouter.post(
    "/",
    authenticate,
    validateBody(schemas.createCardSchema),
    upload.single("photo_url"),
    cardServices.createCard
  );

cardsRouter.get("/lost", cardServices.getAllLost);
cardsRouter.get("/found", cardServices.getAllFound);

cardsRouter.get("/:ownerId", authenticate, cardServices.getOwnerCards);


// cardsRouter.get("/recent",);

cardsRouter.put(
  "/:cardId",
  authenticate,
  validateBody(schemas.updateCardSchema),
  cardServices.updateCardCtrl
);
  
cardsRouter.delete("/:cardId", authenticate, cardServices.deleteCard);

export default cardsRouter;