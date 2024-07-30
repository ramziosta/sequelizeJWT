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
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id',
            },
            allowNull: false,
        },
    },
    // {
    //     freezeTableName: true,
    //     timestamps: true
    // }
);


export default Post;