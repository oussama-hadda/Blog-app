import {Request, Response} from "express";
import {
    changeCommentContent,
    createComment,
    deleteCommentById,
    getAllComments,
    getCommentById
} from "../services/commentService";
import {handleControllerError} from "./utils";

/* GET requests */


/**
 * Handles the request of getting all the comments.
 *
 * @param req - The request object.
 * @param res - The response object used to send the response.
 */
export const getAllCommentsController = async (req: Request, res: Response) => {
    try {
        const comments = await getAllComments();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({error: 'An error has occurred:\n${error}'});
    }
}


/**
 * Handles the request of getting a comment by its id.
 *
 * @param req - The request object containing the id of the comment.
 * @param res - The response object used to send the response.
 */
export const getCommentByIdController = async (req: Request, res: Response) => {
    try {
        const comment = await getCommentById(req.params.id);
        if (!comment) {
            res.status(404).json({error: 'Comment not found'});
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({error: 'An error has occurred:\n${error}`'});
    }
}

/* POST requests */

/**
 * Handles the request of creating a comment.
 *
 * @param req - The request object containing the required fields of Comment.
 * @param res - The response object used to send the response.
 */
export const createCommentController = async (req: Request, res: Response) => {
    try {
        const newComment = await createComment(req.body);
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({error: 'An error has occurred:\n${error}`});'})
    }
}

/* PATCH requests */

/**
 * Handles the request of changing a comment's content.
 *
 * @param req - The request object containing the id of the comment and the new content.
 * @param res - The response object used to send the response.
 */
export const changeCommentContentController = async (req: Request, res: Response) => {
    try {
        const newComment = await changeCommentContent(req.body.id, req.body.content);
        res.status(200).json(newComment);
    } catch (error) {
        handleControllerError(res, error, "Comment");
    }
}

/* DELETE requests */

/**
 * Handles the request of deleting a comment.
 *
 * @param req - The request object containing the id of the comment to delete.
 * @param res - The response object used to send the response.
 */
export const deleteCommentByIdController = async (req: Request, res: Response) => {
    try {
        const deletedCount = await deleteCommentById(req.body.id);
        switch (deletedCount) {
            case 0:
                res.status(404).json({message: 'Comment not found.'});
                break
            case 1:
                res.status(204).json({message: 'Comment deleted successfully.'});
                break
            default:
                res.status(500).json({error: 'An error has occurred.'});
                break
        }
    } catch (error) {
        res.status(500).json({error: 'An error has occurred:\n${error}'});
    }
}
