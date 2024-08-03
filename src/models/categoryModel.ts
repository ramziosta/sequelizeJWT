import {DataTypes, Model} from 'sequelize';
import sequelize from '../config/database';

interface CategoryAttributes {
    id?: number;
    name: string;
}

class Category extends Model<CategoryAttributes> implements CategoryAttributes {
    public id!: number;
    public name!: string;
}

// Initialize the Category model
Category.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'category',
});

export default Category;
