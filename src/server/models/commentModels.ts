import sequelize from '../config/database'
import {DataTypes} from 'sequelize'
import Users from './userModels'
import Posts from './postModels'
import Categories from "./categoryModels";

const Comments = sequelize.define('comment',
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
    }
);


export default Comments;