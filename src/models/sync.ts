import sequelize from '../config/database';
import User from './userModel';
import Post from './postModel';
import Category from './categoryModel';
import Comment from './commentModel';
import PostCategories from "./postCategoriesModel";
import {QueryInterface} from "sequelize";


User.hasMany(Post, {foreignKey: 'userId'});

Post.belongsTo(User, {foreignKey: 'userId'});
Post.hasMany(Comment, {foreignKey: 'postId'});
Post.belongsToMany(Category, {through: 'post_categories'});
Post.hasMany(Comment, {foreignKey: 'postId'})
Post.belongsTo(User, {foreignKey: 'userId'})
Post.hasMany(PostCategories, {foreignKey: 'postId'});


Category.belongsToMany(Post, {foreignKey: 'categoryId', through: 'PostCategories'})
Category.hasMany(PostCategories, {foreignKey: 'categoryId'});

Comment.belongsTo(Post, {foreignKey: 'postId'});
Comment.belongsTo(User, {foreignKey: 'userId'});

const syncDatabase = async (): Promise<void> => {
    try {
        console.log('Database synced successfully.');

        const queryInterface: QueryInterface = sequelize.getQueryInterface();
        const tables: string[] = await queryInterface.showAllTables();
        console.log('📊 Tables in the database:', tables);
    } catch (error) {
        console.error('‼️ Error syncing database:', error);
    }
};

export default syncDatabase;