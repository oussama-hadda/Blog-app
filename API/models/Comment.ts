import {DataTypes, Model, Optional} from 'sequelize';
import sequelize from '../config/database';

interface CommentAttributes {
    id: string;
    content: string;
}

interface CommentCreationAttributes extends Optional<CommentAttributes, 'id'> {
}

class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
    public id!: string;
    public content!: string;

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
    },
    {
        sequelize
    }
)

export default Comment;
