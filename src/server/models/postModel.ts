import sequelize from '../config/database';
import {DataTypes} from 'sequelize';
import User from './userModel';

const Post = sequelize.define(
    'post',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    // {
    //     freezeTableName: true,
    //     timestamps: true
    // }
);


export default Post;