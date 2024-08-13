import {
    addTagController,
    createPostController,
    deletePostByIdController,
    deleteTagController,
    getAllPostsController,
    getLastPostsController,
    getPostByIdController,
    getPostCommentsController,
    getPostLikesController,
    getPostNbLikesController,
    getPostsBetween2DatesInCategoryController,
    getPostsInCategoryController
} from "../controllers/postController";
import {Router} from "express";

const postRouter = Router();

postRouter.get('/', getAllPostsController);
postRouter.post('/', createPostController);

postRouter.get('/last', getLastPostsController);

postRouter.get('/:id', getPostByIdController);
postRouter.delete('/:id', deletePostByIdController);
postRouter.get('/:id/comments', getPostCommentsController);
postRouter.get('/:id/likes', getPostLikesController);
postRouter.get('/:id/likes/number', getPostNbLikesController);
postRouter.patch('/:id/tag', addTagController);
postRouter.delete('/:id/tag', deleteTagController);

postRouter.get('/category', getPostsInCategoryController);
postRouter.get('/category/dates', getPostsBetween2DatesInCategoryController);


export default postRouter;
