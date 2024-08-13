import {Request, Response} from "express";
import {
    createInteraction,
    deleteInteractionById,
    getAllInteractions,
    getInteractionById
} from "../services/interactionService";

/* GET requests */


/**
 * Handles the request of getting all the interactions.
 *
 * @param req - The request object.
 * @param res - The response object used to send the response.
 */
export const getAllInteractionsController = async (req: Request, res: Response) => {
    try {
        const interactions = await getAllInteractions();
        res.status(200).json(interactions);
    } catch (error) {
        res.status(500).json({error: 'An error has occurred:\n${error}'});
    }
}


/**
 * Handles the request of getting an interaction by its id.
 *
 * @param req - The request object containing the id of the interaction.
 * @param res - The response object used to send the response.
 */
export const getInteractionByIdController = async (req: Request, res: Response) => {
    try {
        const interaction = await getInteractionById(req.params.id);
        if (!interaction) {
            res.status(404).json({error: 'Interaction not found'});
        }
        res.status(200).json(interaction);
    } catch (error) {
        res.status(500).json({error: 'An error has occurred:\n${error}`'});
    }
}

/* POST requests */

/**
 * Handles the request of creating an interaction.
 *
 * @param req - The request object containing the required fields of Interaction.
 * @param res - The response object used to send the response.
 */
export const createInteractionController = async (req: Request, res: Response) => {
    try {
        const newInteraction = await createInteraction(req.body);
        res.status(201).json(newInteraction);
    } catch (error) {
        res.status(500).json({error: 'An error has occurred:\n${error}`});'})
    }
}

/* DELETE requests */

/**
 * Handles the request of deleting an interaction.
 *
 * @param req - The request object containing the id of the interaction to delete.
 * @param res - The response object used to send the response.
 */
export const deleteInteractionByIdController = async (req: Request, res: Response) => {
    try {
        const deletedCount = await deleteInteractionById(req.params.id);
        switch (deletedCount) {
            case 0:
                res.status(404).json({message: 'Interaction not found.'});
                break
            case 1:
                res.status(204).json({message: 'Interaction deleted successfully.'});
                break
            default:
                res.status(500).json({error: 'An error has occurred.'});
                break
        }
    } catch (error) {
        res.status(500).json({error: 'An error has occurred:\n${error}'});
    }
}
