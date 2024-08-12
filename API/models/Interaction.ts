import {DataTypes, Model, Optional} from 'sequelize';
import sequelize from '../config/database';
import User from "./User";
import Post from "./Post";
import {InteractionType} from "../types/types";

interface InteractionAttributes {
    id: string;
    postId: string;
    userId: string;
    type: InteractionType;
}

interface InteractionAttributesCreation extends Optional <InteractionAttributes, 'id'> {}

class Interaction extends Model<InteractionAttributes, InteractionAttributesCreation> implements InteractionAttributes {
    public id!: string;
    public postId!: string;
    public userId!: string;
    public type!: InteractionType;

    public getPost() {
        return Post.findByPk(this.postId);
    }

    public getUser() {
        return User.findByPk(this.userId);
    }
}

Interaction.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
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
