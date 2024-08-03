import {DataTypes, Model} from 'sequelize';
import sequelize from '../config/database';

interface PostCategoriesAttributes {
    id?: number;
    postId: number;
    categoryId: number;
}


class PostCategories extends Model<PostCategoriesAttributes> implements PostCategoriesAttributes {
    public id?: number;
    public postId!: number;
    public categoryId!: number;
}

PostCategories.init({
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'post',
                key: 'id',
            },
            primaryKey: true,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'category',
                key: 'id'
            },
            primaryKey: true,
        },
    },
    {
        sequelize,
        modelName: 'post_categories',
    }
);

export default PostCategories;