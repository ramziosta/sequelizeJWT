import {Request, Response, NextFunction} from 'express';
import Post from '../models/postModel';
import User from "../models/userModel";
import Category from "../models/categoryModel";
import Comment from "../models/commentModel";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log('Request body:', req.body); // Debugging line

    const {name, email, password} = req.body as { name: string; email: string; password: string };

    try {

        // Add a new user
        const user = await User.create({
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
        res.status(500).json({error: 'Internal server error'});
    }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.findAll();
    if (users.length === 0) {
        return res.status(404).json({error: 'No users found'});
    }
    res.status(200).json({users});
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;

    if (!id) {
        return res.status(400).json({error: 'Please enter a user id'});
    }

    const user = await User.findByPk(id);
    if (!user) {
        return res.status(404).json({error: 'User not found'});
    }
    res.status(200).json({user});
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const {name, email, password, login, id} = req.body as {
        name: string,
        email: string,
        password: string,
        login: boolean,
        id: number
    };

    if (!id) {
        return res.status(400).json({error: 'Please enter a user id'});
    }

    const user = await User.findByPk(id);
    if (!user) {
        return res.status(404).json({error: 'User not found'});
    }

    await user.update({name, email, password, login});
    res.status(200).json({user});
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;

    if (!id) {
        return res.status(400).json({error: 'Please enter a user id'});
    }

    const user = await User.findByPk(id);
    if (!user) {
        return res.status(404).json({error: 'Could not delete user. User not found'});
    }
    await user.destroy();
    res.status(200).send({message: 'User deleted successfully'});
}
