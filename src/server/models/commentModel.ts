import sequelize from '../config/database'
import {DataTypes} from 'sequelize'
import Users from './userModel'
import Posts from './postModel'
import Categories from "./categoryModel";

const Comments = sequelize.define(
    'comment',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: Users,
                key: 'id',
            },
            allowNull: false,
        },
        postId: {
            type: DataTypes.INTEGER,
            references: {
                model: Posts,
                key: 'id',
            },
            allowNull: false,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            references: {
                model: Categories,
                key: 'id',
            },
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: true
    }
);


export default Comments;