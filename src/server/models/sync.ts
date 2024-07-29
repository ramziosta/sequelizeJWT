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
        // Sync all models
        await sequelize.sync({ force: true }); // Use `force: true` to drop and recreate tables.
        console.log('Database synced successfully.');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};

syncDatabase().then(() => {
    console.log('Database synced successfully.');
});