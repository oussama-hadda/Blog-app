import {DataTypes, Model, Optional} from 'sequelize';
import sequelize from '../config/database';
import Comment from "./Comment";
import Interaction from "./Interaction";

interface PostAttributes {
    id: string;
    Title: string;
    content: string;
    category: string;
    tags: string[];
}

interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {
}

class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
    public id!: string;
    public Title!: string;
    public content!: string;
    public category!: string;
    public tags!: string[];
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
            get(){
                return this.getDataValue("tags") ? this.getDataValue("tags") : [];
            }
        },
    }, {
        sequelize
    }
);

export default Post;


Post.hasMany(Comment);
Comment.belongsTo(Post);

Post.hasMany(Interaction);
Interaction.belongsTo(Post);
