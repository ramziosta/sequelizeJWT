import sequelize from '../config/database';
import {DataTypes} from 'sequelize';

const Category = sequelize.define(
    'category',
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
    // {
    //     freezeTableName: true,
    //     timestamps: true
    // }
);

export default Category;