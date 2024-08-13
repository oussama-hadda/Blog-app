import {Request, Response} from 'express';
import {
    addTag,
    createPost,
    deletePostById,
    deleteTag,
    getAllPosts,
    getLastPosts,
    getPostById,
    getPostComments,
    getPostLikes,
    getPostNbLikes,
    getPostsBetween2DatesInCategory,
    getPostsInCategory
} from "../services/postService";
import {handleControllerError} from "./utils";

/* GET requests */

/**
 * Handles the request of getting all the posts.
 *
 * @param req - The request object.
 * @param res - The response object used to send the response.
 */
export const getAllPostsController = async (req: Request, res: Response) => {
    try {
        const posts = await getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({error: `An error has occurred: ${error}`});
    }
};

/**
 * Handles the request of getting N last added posts.
 *
 * @param req - The request object containing the number of the posts.
 * @param res - The response object used to send the response.
 */
export const getLastPostsController = async (req: Request, res: Response) => {
    try {
        const posts = await getLastPosts(req.body.number);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({error: `An error has occurred: ${error}`});
    }
}

/**
 * Handles the request of getting a post by its id.
 *
 * @param req - The request object containing the id of the post.
 * @param res - The response object used to send the response.
 */
export const getPostByIdController = async (req: Request, res: Response) => {
    try {
        const post = await getPostById(req.params.id);
        if (!post) {
            return res.status(404).json({error: 'Utilisateur non trouvé'});
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({error: `An error has occurred: ${error}`});
    }
};

/**
 * Handles the request of getting all posts in a certain category.
 *
 * @param req - The request object containing the name of the category, an optional offset and an optional limit.
 * @param res - The response object used to send the response.
 */
export const getPostsInCategoryController = async (req: Request, res: Response) => {
    try {
        const categoryPosts = await getPostsInCategory(
            req.params.category,
            req.body.offset ? parseInt(req.body.offset) : undefined,
            req.body.limit ? parseInt(req.body.limit) : undefined,
        );
        res.status(200).json(categoryPosts);
    } catch (error) {
        handleControllerError(res, error, "Category");
    }
}

/**
 * Handles the request of getting all posts in a certain category between two dates.
 *
 * @param req - The request object containing the name of the category, the firstDate and the secondDate.
 * @param res - The response object used to send the response.
 */
export const getPostsBetween2DatesInCategoryController = async (req: Request, res: Response) => {
    try {
        const categoryPosts = await getPostsBetween2DatesInCategory(
            req.params.category,
            new Date(req.body.firstDate),
            new Date(req.body.secondDate),
        );
        res.status(200).json(categoryPosts);
    } catch (error) {
        handleControllerError(res, error, "Category");
    }
}

/**
 * Handles the request of getting all comments in a post.
 *
 * @param req - The request object containing the id of the post.
 * @param res - The response object used to send the response.
 */
export const getPostCommentsController = async (req: Request, res: Response) => {
    try {
        const postComments = await getPostComments(req.params.id);
        res.status(200).json(postComments);
    } catch (error) {
        handleControllerError(res, error, "Post");
    }
}

/**
 * Handles the request of getting all the likes of a post.
 *
 * @param req - The request object containing the id of the post.
 * @param res - The response object used to send the response.
 */
export const getPostLikesController = async (req: Request, res: Response) => {
    try {
        const postComments = await getPostLikes (req.params.id);
        res.status(200).json(postComments);
    } catch (error) {
        handleControllerError(res, error, "Post");
    }
}


/**
 * Handles the request of getting the number of likes of a post.
 *
 * @param req - The request object containing the id of the post.
 * @param res - The response object used to send the response.
 */
export const getPostNbLikesController = async (req: Request, res: Response) => {
    try {
        const postComments = await getPostNbLikes (req.params.id);
        res.status(200).json(postComments);
    } catch (error) {
        handleControllerError(res, error, "Post");
    }
}

/* POST requests */

/**
 * Handles the request of creating a post.
 *
 * @param req - The request object containing the required attributes of Post.
 * @param res - The response object used to send the response.
 */
export const createPostController = async (req: Request, res: Response) => {
    try {
        const newPost = await createPost(req.body);
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({error: `An error has occurred: ${error}`});
    }
};

/* PATCH requests */


/**
 * Handles the request of adding a tag to a post.
 *
 * @param req - The request object containing the id of the post and the value of the tag.
 * @param res - The response object used to send the response.
 */
export const addTagController = async (req: Request, res: Response) => {
    try {
        const newTags = await addTag(req.params.id, req.params.tag);
        res.status(201).json(newTags);
    } catch (error) {
        handleControllerError(res, error, 'Post');
    }
}

/* DELETE requests */


/**
 * Handles the request of deleting a tag in a post.
 *
 * @param req - The request object containing the id of the post and the value of the tag to delete.
 * @param res - The response object used to send the response.
 */
export const deleteTagController = async (req: Request, res: Response) => {
    try {
        const newTags = await deleteTag(req.params.id, req.params.tag);
        res.status(201).json(newTags);
    } catch (error) {
        handleControllerError(res, error, 'Post');
    }
}

/**
 * Handles the request of deleting a post.
 *
 * @param req - The request object containing the id of the post to delete.
 * @param res - The response object used to send the response.
 */
export const deletePostByIdController = async (req: Request, res: Response) => {
    try {
        const deletedCount = await deletePostById(req.params.id);
        switch (deletedCount) {
            case 0:
                res.status(404).json({message: 'Post not found.'});
                break
            case 1:
                res.status(204);
                break
            default:
                res.status(500).json({error: 'An error has occurred.`'});
                break
        }
    } catch (error) {
        res.status(500).json({error: `An error has occurred: ${error}`});
    }
}
