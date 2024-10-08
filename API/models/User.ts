import {DataTypes, Model, Optional} from 'sequelize';
import sequelize from '../config/database';
import Post from "./Post";
import Comment from "./Comment";
import Interaction from "./Interaction";
import Follow from "./Follow";

interface UserAttributes {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    description: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {
}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: string;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;
    public description!: string;
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        // @ts-ignore
        fullName: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.firstName} ${this.lastName}`;
            },
            set(value) {
                throw new Error('Do not try to set the `fullName` value!');
            },
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(64),
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
    }
);

export default User;

User.hasMany(Post,
    {
        foreignKey: "userId",
    });
Post.belongsTo(User,
    {
        foreignKey: "userId",
    });

User.hasMany(Comment,
    {
        foreignKey: "userId",
    });
Comment.belongsTo(User,
    {
        foreignKey: "userId",
    });

User.hasMany(Interaction,
    {
        foreignKey: "userId",
    });
Interaction.belongsTo(User,
    {
        foreignKey: "userId",
    });

User.hasMany(Follow,
    {
        foreignKey: "followerId",
        as: "Following",
    });
Follow.belongsTo(User,
    {
        foreignKey: "followerId",
        as: "Follower",
    });

User.hasMany(Follow,
    {
        foreignKey: "followedId",
        as: "Followers",
    });
Follow.belongsTo(User,
    {
        foreignKey: "followedId",
        as: "Followed",
    });
