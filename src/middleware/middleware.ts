import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';

export const validateUserRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body as {
            name: number;
            email: string;
            password: string;
        };

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({error: 'Missing required fields to create a new user'});
        }

        // Check if email already exists in the database
        console.log('Checking if email is used:', email);
        const existingUser = await User.findOne({where: {email}});
        if (existingUser) {
            return res.status(400).json({error: 'Email is already used, please use a different email'});
        }

        // If all validations pass, proceed to the next middleware/handler
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const validatePostRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, title, content } = req.body as {
            userId: number;
            title: string;
            content: string;
        };

        // Check for the existence of the user
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Check for required fields
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and password are required' });
        }

        // If all validations pass, proceed to the next middleware/handler
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};