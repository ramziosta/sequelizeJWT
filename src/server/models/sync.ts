import sequelize from '../config/database';
import User from './userModels';
import Post from './postModels';
import Category from './categoryModels';
import Comment from './commentModels';

User.hasMany(Post);
Post.belongsTo(User);
Post.belongsToMany(Category, { through: 'PostCategories' });
Category.belongsToMany(Post, { through: 'PostCategories' });
Post.hasMany(Comment);
Comment.belongsTo(Post);
Comment.belongsTo(User);

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); // Sync all models
        console.log('Database synced successfully.');

        // Use queryInterface to list tables
        const queryInterface = sequelize.getQueryInterface();
        const tables: string[] = await queryInterface.showAllTables();
        console.log('📊 Tables in the database:', tables);
    } catch (error) {
        console.error('‼️Error syncing database:', error);
    }
};

export default syncDatabase;