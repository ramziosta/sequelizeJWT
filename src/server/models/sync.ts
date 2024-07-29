import sequelize from '../config/database';
import User from './userModel';
import Post from './postModel';
import Category from './categoryModel';
import Comment from './commentModel';

//the user has many posts
User.hasMany(Post);
// the posts belong to many users
Post.belongsTo(User);
// the post has many different categories
Post.belongsToMany(Category, {through: 'post_categories'});
// many categories to many different posts
Category.belongsToMany(Post, {through: 'post_categories'});
// each post can have many comments
Post.hasMany(Comment);
// each comment belong to one particular post
Comment.belongsTo(Post);
// each comment is associated with one user
Comment.belongsTo(User);

const syncDatabase = async () => {
    try {
        await sequelize.sync({force: true}); // Sync all models
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