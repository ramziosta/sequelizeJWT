import { DataTypes } from 'sequelize';
import sequelize from '../config/database';



const PostCategories = sequelize.define('post_categories',{

    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    freezeTableName: true,
    timestamps: true
});

export default PostCategories;