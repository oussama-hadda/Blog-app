import {Request, Response} from 'express';
import {
    createUser,
    deleteUserById,
    getAllUsers,
    getUserById,
    getUserFollowers,
    getUserFollowersNb,
    getUserFollowing,
    getUserFollowingNb,
    getUserInteractedPosts,
    getUserPosts,
    modifyUser,
} from "../services/userService";
import {handleControllerError} from "./utils";

/* GET requests */

/**
 * Handles the request of getting all the users.
 *
 * @param req - The request object.
 * @param res - The response object used to send the response.
 */
export const getAllUsersController = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error: `An error has occurred: ${error}`});
    }
};

/**
 * Handles the request of getting a user by its id.
 *
 * @param req - The request object containing the id of the user.
 * @param res - The response object used to send the response.
 */
export const getUserByIdController = async (req: Request, res: Response) => {
    try {
        const user = await getUserById(req.params.id);
        if (!user) {
            res.status(404).json({error: 'User not found'});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error: `An error has occurred: ${error}`});
    }
};

/**
 * Handles the request of getting all the posts written by the user.
 *
 * @param req - The request object containing the id of the user.
 * @param res - The response object used to send the response.
 */
export const getUserPostsController = async (req: Request, res: Response) => {
    try {
        const posts = await getUserPosts(req.params.id);
        res.status(200).json(posts);
    } catch (error) {
        handleControllerError(res, error);
    }
};


/**
 * Handles the request of getting the id, the title and content of posts liked by this user.
 *
 * @param req - The request object containing the id of the user.
 * @param res - The response object used to send the response.
 */
export const getUserLikedPostsController = async (req: Request, res: Response) => {
    try {
        const posts = await getUserInteractedPosts(req.params.id, "like");
        res.status(200).json(posts);
    } catch (error) {
        handleControllerError(res, error);
    }
}

/**
 * Handles the request of getting the id, the title and content of the posts bookmarked by this user.
 *
 * @param req - The request object containing the id of the user.
 * @param res - The response object used to send the response.
 */
export const getUserBookmarkedPostsController = async (req: Request, res: Response) => {
    try {
        const posts = await getUserInteractedPosts(req.params.id, "bookmark");
        res.status(200).json(posts);
    } catch (error) {
        handleControllerError(res, error);
    }
}

/**
 * Handles the request of getting the id and the fullName of the users' followers.
 *
 * @param req - The request object containing the id of the user.
 * @param res - The response object used to send the response.
 */
export const getUserFollowersController = async (req: Request, res: Response) => {
    try {
        const followers = await getUserFollowers(req.params.id);
        res.status(200).json(followers);
    } catch (error) {
        handleControllerError(res, error);
    }
}

/**
 * Handles the request of getting the id and the fullName of the users followed by the user.
 *
 * @param req - The request object containing the id of the user.
 * @param res - The response object used to send the response.
 */
export const getUserFollowingController = async (req: Request, res: Response) => {

    try {
        const following = await getUserFollowing(req.params.id);
        res.status(200).json(following);
    } catch (error) {
        handleControllerError(res, error);
    }
}

/**
 * Handles the request of getting the number of the users following the user.
 *
 * @param req - The request object containing the id of the user.
 * @param res - The response object used to send the response.
 */
export const getUserFollowersNbController = async (req: Request, res: Response) => {
    try {
        const followersNb = await getUserFollowersNb(req.params.id);
        res.status(200).json(followersNb);
    } catch (error) {
        handleControllerError(res, error);
    }
}

/**
 * Handles the request of getting the number of the users followed by the user.
 *
 * @param req - The request object containing the id of the user.
 * @param res - The response object used to send the response.
 */
export const getUserFollowingNbController = async (req: Request, res: Response) => {
    try {
        const followingNb = await getUserFollowingNb(req.params.id);
        res.status(200).json(followingNb);
    } catch (error) {
        handleControllerError(res, error);
    }
}

/* POST requests */

/**
 * Handles the request of creating a new user.
 *
 * @param req - The request object containing the required attributes of User.
 * @param res - The response object used to send the response.
 */
export const createUserController = async (req: Request, res: Response) => {
    try {
        const newUser = await createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({error: `An error has occurred: ${error}`});
    }
};

/* PATCH requests */

/**
 * Handles the request of modifying the first name of a user.
 *
 * @param req - The request object containing the id and the firstName of the user.
 * @param res - The response object used to send the response.
 */
export const modifyUserFirstNameController = async (req: Request, res: Response) => {
    try {
        const newUser = await modifyUser(req.params.id, req.params.firstName, "firstName");
        res.status(201).json(newUser);
    } catch (error) {
        handleControllerError(res, error);
    }
};

/**
 * Handles the request of modifying the last name of a user.
 *
 * @param req - The request object containing the id and the lastName of the user.
 * @param res - The response object used to send the response.
 */
export const modifyUserLastNameController = async (req: Request, res: Response) => {
    try {
        const newUser = await modifyUser(req.params.id, req.params.lastName, "lastName");
        res.status(201).json(newUser);
    } catch (error) {
        handleControllerError(res, error);
    }
};

/**
 * Handles the request of modifying the password of a user.
 *
 * @param req - The request object containing the id and the password of the user.
 * @param res - The response object used to send the response.
 */
export const modifyUserPasswordController = async (req: Request, res: Response) => {
    try {
        const newUser = await modifyUser(req.params.id, req.body.password, "password");
        res.status(201).json(newUser);
    } catch (error) {
        handleControllerError(res, error);
    }
};

/**
 * Handles the request of modifying the description of a user.
 *
 * @param req - The request object containing the id and the description of the user.
 * @param res - The response object used to send the response.
 */
export const modifyUserDescriptionController = async (req: Request, res: Response) => {
    try {
        const newUser = await modifyUser(req.params.id, req.body.description, "description");
        res.status(201).json(newUser);
    } catch (error) {
        handleControllerError(res, error);
    }
};

/* DELETE requests */

/**
 * Handles the request of deleting a user.
 *
 * @param req - The request object containing the required attributes of User.
 * @param res - The response object used to send the response.
 */
export const deleteUserByIdController = async (req: Request, res: Response) => {
    try {
        const deletedCount = await deleteUserById(req.params.id);
        switch (deletedCount) {
            case 0:
                res.status(404).json({message: 'User not found.'});
                break
            case 1:
                res.status(204).json({message: 'User deleted successfully.'});
                break
            default:
                res.status(500).json({error: 'An error has occurred.`'});
                break
        }
    } catch (error) {
        res.status(500).json({error: `An error has occurred: ${error}`});
    }
}
