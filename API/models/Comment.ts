import {DataTypes, Model, Optional} from 'sequelize';
import sequelize from '../config/database';
import User from "./User";
import Post from "./Post";

interface CommentAttributes {
    id: string;
    postId: string;
    userId: string;
    content: string;
}

interface CommentCreationAttributes extends Optional<CommentAttributes, 'id'> {}

class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
    public id!: string;
    public content!: string;
    public postId!: string;
    public userId!: string;

    public getPost() {
        return Post.findByPk(this.postId);
    }

    public getUser() {
        return User.findByPk(this.userId);
    }
}

Comment.init(
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
        content: {
            type: DataTypes.STRING(512),
            allowNull: false,
        },
    },
    {
        sequelize
    }
)

export default Comment;
