import Interaction from "../models/Interaction";

/* GET requests */

export const getAllInteractions = async () => {
    return await Interaction.findAll();
};

export const getInteractionById = async (id: string) => {
    return await Interaction.findByPk(id);
};

/* POST requests */

export const createInteraction = async (interactionData: any) => {
    return await Interaction.create(interactionData);
};

/* DELETE request */

export const deleteInteractionById = async (id: string) => {
    return await Interaction.destroy({
        where: {
            id: id,
        }
    })
}
