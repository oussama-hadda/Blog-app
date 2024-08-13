import {Request, Response} from "express";
import {createFollow, deleteFollow, getAllFollows, getFollow} from "../services/followService";

/* GET requests */


/**
 * Handles the request of getting all the followings.
 *
 * @param req - The request object.
 * @param res - The response object used to send the response.
 */
export const getAllFollowsController = async (req: Request, res: Response) => {
    try {
        const follows = await getAllFollows();
        res.status(200).json(follows);
    } catch (error) {
        res.status(500).json({error: 'An error has occurred:\n${error}'});
    }
}


/**
 * Handles the request of getting a follow.
 *
 * @param req - The request object containing the followerId and the followedId.
 * @param res - The response object used to send the response.
 */
export const getFollowController = async (req: Request, res: Response) => {
    try {
        const follow = await getFollow(req.params.followerId, req.params.followedId);
        if (!follow) {
            res.status(404).json({error: 'Follow not found'});
        }
        res.status(200).json(follow);
    } catch (error) {
        res.status(500).json({error: 'An error has occurred:\n${error}`'});
    }
}

/* POST requests */

/**
 * Handles the request of creating a follow.
 *
 * @param req - The request object containing the required fields of Follow.
 * @param res - The response object used to send the response.
 */
export const createFollowController = async (req: Request, res: Response) => {
    try {
        const newFollow = await createFollow(req.body);
        res.status(201).json(newFollow);
    } catch (error) {
        res.status(500).json({error: 'An error has occurred:\n${error}`});'})
    }
}

/* DELETE requests */

/**
 * Handles the request of deleting a Follow.
 *
 * @param req - The request object containing the followerId and the followedId.
 * @param res - The response object used to send the response.
 */
export const deleteFollowController = async (req: Request, res: Response) => {
    try {
        const deletedCount = await deleteFollow(req.body.followedId, req.params.followedId);
        switch (deletedCount) {
            case 0:
                res.status(404).json({message: 'Follow not found.'});
                break
            case 1:
                res.status(204).json({message: 'Follow deleted successfully.'});
                break
            default:
                res.status(500).json({error: 'An error has occurred.'});
                break
        }
    } catch (error) {
        res.status(500).json({error: 'An error has occurred:\n${error}'});
    }
}
