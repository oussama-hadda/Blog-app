import {DataTypes, Model} from 'sequelize';
import sequelize from '../config/database';
import User from "./User";

class Follow extends Model {
    public followerId!: string;
    public followedId!: string;
}

Follow.init(
    {
        followerId: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: 'id',
            },
            allowNull: false,
        },
        followedId: {
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

export default Follow;
