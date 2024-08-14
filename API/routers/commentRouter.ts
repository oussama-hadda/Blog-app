import {Router} from "express";
import {
    changeCommentContentController,
    createCommentController,
    deleteCommentByIdController,
    getAllCommentsController,
    getCommentByIdController
} from "../controllers/commentController";

const commentRouter = Router()

commentRouter.get("/", getAllCommentsController);
commentRouter.post("/", createCommentController);

commentRouter.get("/:id", getCommentByIdController);
commentRouter.delete("/:id", deleteCommentByIdController);
commentRouter.patch("/:id", changeCommentContentController);

export default commentRouter;
