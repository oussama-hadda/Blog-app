import {DataTypes, Model, Optional} from 'sequelize';
import sequelize from '../config/database';
import {InteractionType} from "../types/types";

interface InteractionAttributes {
    id: string;
    type: InteractionType;
}

interface InteractionAttributesCreation extends Optional <InteractionAttributes, 'id'> {
}

class Interaction extends Model<InteractionAttributes, InteractionAttributesCreation> implements InteractionAttributes {
    public id!: string;
    public type!: InteractionType;
}

Interaction.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        type: {
            type: DataTypes.STRING(512),
            allowNull: false,
        },
    },
    {
        sequelize
    }
)

export default Interaction;
