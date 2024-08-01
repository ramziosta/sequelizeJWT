import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './userModel';

// Define the attributes for the Post model
interface PostAttributes {
    id: number;
    title: string;
    content: string;
    userId: number;
}



// Define the Post model class
class Post extends Model<PostAttributes, any> implements PostAttributes {
    public id!: number;
    public title!: string;
    public content!: string;
    public userId!: number;
}

// Initialize the Post model
Post.init({
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
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
}, {
    sequelize,
    tableName: 'post',
    //timestamps: true,
    //freezeTableName: true,
});

// Define associations if needed
Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default Post;