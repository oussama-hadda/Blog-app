import {Router} from "express";
import {
    createInteractionController,
    deleteInteractionByIdController,
    getAllInteractionsController,
    getInteractionByIdController
} from "../controllers/interactionController";


const interactionRouter = Router()

interactionRouter.get("/", getAllInteractionsController);
interactionRouter.post("/", createInteractionController);

interactionRouter.get("/:id", getInteractionByIdController);
interactionRouter.delete("/:id", deleteInteractionByIdController);


export default interactionRouter;
