import {DataTypes, Model, Optional} from 'sequelize';
import sequelize from '../config/database';
import {InteractionType} from "../types/types";
import User from "./User";
import Post from "./Post";

interface InteractionAttributes {
    id: string;
    type: InteractionType;
    postId: string;
    userId: string;
}

interface InteractionAttributesCreation extends Optional <InteractionAttributes, 'id'> {
}

class Interaction extends Model<InteractionAttributes, InteractionAttributesCreation> implements InteractionAttributes {
    public id!: string;
    public type!: InteractionType;
    public postId!: string;
    public userId!: string;
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
        postId: {
            type: DataTypes.UUID,
            references: {
                model: Post,
                key: 'id',
            },
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: 'id',
            },
            allowNull: false,
        },
    },
    {
        sequelize
    }
)

export default Interaction;
