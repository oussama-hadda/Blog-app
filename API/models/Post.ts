import {DataTypes, Model, Optional} from 'sequelize';
import sequelize from '../config/database';
import User from "./User";
import Comment from "./Comment";
import Interaction from "./Interaction";

interface PostAttributes {
    id: string;
    Title: string;
    content: string;
    category: string;
    tags: string[];
    userId: string;
}

interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {
}

class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
    public id!: string;
    public Title!: string;
    public content!: string;
    public category!: string;
    public tags!: string[];
    public userId!: string;

    public getUser() {
        return User.findByPk(this.userId);
    }
}

Post.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        Title: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(4096),
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        tags: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        userId: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: 'id',
            },
            allowNull: false,
        },
    }, {
        sequelize
    }
);

Post.belongsTo(User, {foreignKey: 'postId'});
Post.hasMany(Comment, { foreignKey: 'postId' });
Post.hasMany(Interaction, { foreignKey: 'postId' });

export default Post;
