import {Router} from "express";
import {
    createFollowController,
    deleteFollowController,
    getAllFollowsController,
    getFollowController
} from "../controllers/followController";

const followRouter = Router()

followRouter.get("/", getAllFollowsController);
followRouter.post("/", createFollowController);

followRouter.get("/:followerId", getFollowController);
followRouter.delete("/:followerId", deleteFollowController);

export default followRouter;
