import { Request, Response, NextFunction } from 'express';
import Post from '../models/postModel';

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
    console.log('Request body:', req.body); // Debugging line

    const { name, email, password } = req.body as { name: string; email: string; password: string };

    try {
        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check if email already exists in the database
        console.log('Checking if email is used:', email);
        const existingUser = await Post.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already used, please use a different email' });
        }

        // Add a new user
        const user = await Post.create({
            name,
            email,
            password
        });

        // Send success response
        res.status(201).json({
            message: 'User created successfully',
            user: user.toJSON()
        });

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getPost =  async (req: Request, res: Response, next: NextFunction) => {

}

export const getPostById =  async (req: Request, res: Response, next: NextFunction) => {

}

export const updatePost =  async (req: Request, res: Response, next: NextFunction) => {

}

export const deleteUser =  async (req: Request, res: Response, next: NextFunction) => {

}