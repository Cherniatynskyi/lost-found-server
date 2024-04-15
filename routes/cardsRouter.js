import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import * as schemas from "../schemas/cardSchema.js";
import * as cardServices from "../controllers/cardControllers.js";

const cardsRouter = express.Router();

cardsRouter.post(
    "/",
    authenticate,
    validateBody(schemas.createCardSchema),
    cardServices.createCard
  );

cardsRouter.get("/lost", cardServices.getAllLost);
cardsRouter.get("/found", cardServices.getAllFound);

cardsRouter.get("/:ownerId", cardServices.getOwnerCards);

cardsRouter.get("/:type",);

// cardsRouter.get("/recent",);

  
cardsRouter.put("/:cardId",);
  
cardsRouter.delete( "/:cardId",);

export default cardsRouter;