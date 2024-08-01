import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// Define the attributes for the Category model
interface CategoryAttributes {
    id: number;
    name: string;
}

// Define the optional attributes for the Category model
interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id'> {}

// Define the Category model class
class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
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
    // timestamps: false,
    // freezeTableName:
});

export default Category;