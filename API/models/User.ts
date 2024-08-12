import {DataTypes, Model, Optional} from 'sequelize';
import sequelize from '../config/database';

interface UserAttributes {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    description: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {
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
            type: DataTypes.STRING(512),
            allowNull: true,
        },
    },
    {
        sequelize,
    }
);

export default User;
