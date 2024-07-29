import sequelize from '../config/database';
import {DataTypes} from 'sequelize';

const Users = sequelize.define(
    'user',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,

        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        login: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }

    },
    {
        freezeTableName: true,
        timestamps: true
    }
);

export default Users;