import sequelize from '../config/database';
import User from './userModel';
import Post from './postModel';
import Category from './categoryModel';
import Comment from './commentModel';
import {QueryInterface} from "sequelize";

// Define model associations
User.hasMany(Post);
Post.belongsTo(User);
Post.belongsToMany(Category, { through: 'post_categories' });
Category.belongsToMany(Post, { through: 'post_categories' });
Post.hasMany(Comment);
Comment.belongsTo(Post);
Comment.belongsTo(User);

const syncDatabase = async (): Promise<void> => {
    try {
        await sequelize.sync({ alter: true}); // Sync all models
        console.log('Database synced successfully.');

        // Use queryInterface to list tables
        const queryInterface: QueryInterface = sequelize.getQueryInterface();
        const tables: string[] = await queryInterface.showAllTables();
        console.log('📊 Tables in the database:', tables);
    } catch (error) {
        console.error('‼️ Error syncing database:', error);
    }
};

export default syncDatabase;