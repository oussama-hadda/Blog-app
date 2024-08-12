import {Router} from 'express';
import {
    createUserController,
    deleteUserByIdController,
    getAllUsersController,
    getUserBookmarkedPostsController,
    getUserByIdController,
    getUserFollowersController,
    getUserFollowersNbController,
    getUserFollowingController,
    getUserFollowingNbController,
    getUserLikedPostsController,
    getUserPostsController,
    modifyUserDescriptionController,
    modifyUserFirstNameController,
    modifyUserLastNameController,
    modifyUserPasswordController
} from "../controllers/userController";

const userRouter = Router();

userRouter.get('/', getAllUsersController);
userRouter.post('/', createUserController);

userRouter.get('/:id', getUserByIdController);
userRouter.delete('/:id', deleteUserByIdController);

userRouter.put('/:id/firstName', modifyUserFirstNameController);
userRouter.put('/:id/lastName', modifyUserLastNameController);
userRouter.put('/:id/password', modifyUserPasswordController);
userRouter.put('/:id/description', modifyUserDescriptionController);

userRouter.get('/:id/posts', getUserPostsController);
userRouter.get('/:id/liked-posts', getUserLikedPostsController);
userRouter.get('/:id/bookmarked-posts', getUserBookmarkedPostsController);

userRouter.get('/:id/followers', getUserFollowersController);
userRouter.get('/:id/following', getUserFollowingController);
userRouter.get('/:id/followers/nb', getUserFollowersNbController);
userRouter.get('/:id/following/nb', getUserFollowingNbController);


export default userRouter;
