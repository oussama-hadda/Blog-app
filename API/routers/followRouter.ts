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

followRouter.get("/:followerId/:followerId/", getFollowController);
followRouter.delete("/:followerId/:followedId/", deleteFollowController);

export default followRouter;
