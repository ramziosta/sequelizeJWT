import { Sequelize, DataTypes } from 'sequelize';
require('dotenv').config();

const sequelize: Sequelize = new Sequelize(
    process.env.DB_NAME ?? 'sequelizeJWT',
    process.env.DB_USER ?? 'root',
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST ?? 'localhost',
        dialect: 'mysql', // depends on database type
        logging: false,
    }
);

const testConnection = async (): Promise<boolean> => {
    try {
        await sequelize.authenticate()
            .then(() => console.log('Connected to the database.'));
        return true;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return false;
    }
};

export const connectToDatabase = (async () => {
    const isConnected = await testConnection();
    if (!isConnected) {
        console.error('Failed to connect to database. Exiting...');
        process.exit(1);
    }
    console.log('Connection successful');
})

export const closeConnection = async () => {
    await sequelize.close();
}

export const db: any = sequelize;