import {DataTypes, Model, Optional} from 'sequelize';
import sequelize from '../config/database';
import Post from "./Post";
import User from "./User";

interface CommentAttributes {
    id: string;
    content: string;
    postId: string;
    userId: string;
}

interface CommentCreationAttributes extends Optional<CommentAttributes, 'id'> {
}

class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
    public id!: string;
    public content!: string;
    public postId!: string;
    public userId!: string;

}

Comment.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        content: {
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

export default Comment;
