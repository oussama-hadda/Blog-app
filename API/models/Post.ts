import {DataTypes, Model, Optional} from 'sequelize';
import sequelize from '../config/database';
import Comment from "./Comment";
import Interaction from "./Interaction";
import User from "./User";

interface PostAttributes {
    id: string;
    title: string;
    content: string;
    category: string;
    tags: string[];
    userId: string;
}

interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {
}

class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
    public id!: string;
    public title!: string;
    public content!: string;
    public category!: string;
    public tags!: string[];
    public userId!: string;
}

Post.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        tags: {
            type: DataTypes.JSON,
            allowNull: true,
            get() {
                return this.getDataValue("tags") ? this.getDataValue("tags") : [];
            }
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

export default Post;


Post.hasMany(Comment,
    {
        foreignKey: "postId",
    });
Comment.belongsTo(Post,
    {
        foreignKey: "postId",
    });

Post.hasMany(Interaction,
    {
        foreignKey: "postId",
    });
Interaction.belongsTo(Post,
    {
        foreignKey: "postId",
    });
