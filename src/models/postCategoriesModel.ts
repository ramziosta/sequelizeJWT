import {DataTypes} from 'sequelize';
import sequelize from '../config/database';


const PostCategories = sequelize.define('post_categories', {
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
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        }
    },
    // {
    //     freezeTableName: true,
    //     timestamps: true
    // }
);

export default PostCategories;