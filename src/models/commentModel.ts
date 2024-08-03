import sequelize from '../config/database'
import {DataTypes, Model} from 'sequelize'
import Users from './userModel'
import Posts from './postModel'
import Category from "./categoryModel";

interface CommentsAttributes {
    id?:number,
    content: string,
    userId: number,
    postId: number,
    categoryId: number
}

class Comment extends Model<CommentsAttributes> implements CommentsAttributes {
    public id?: number;
    public content!: string;
    public userId!: number;
    public postId!: number;
    public categoryId!: number;
}

Comment.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
                model: Category,
                key: 'id',
            },
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'comment',
    }
);

export default Comment;

//Comments.belongsTo(Users,{foreignKey: {name: 'user_id'}})

