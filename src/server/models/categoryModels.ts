import sequelize from '../config/database';
import {DataTypes} from 'sequelize';

const Categories = sequelize.define('category',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
);

export default Categories;