import {Request, Response, NextFunction} from 'express';
import Post from '../models/postModel';
import User from "../models/userModel";

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
    const {title, content, userId} = req.body as { title: string; content: string, userId: number };
    if (!userId) {
        return res.status(400).json({error: 'Please enter a user id'});
    }
    try {
        // Validate required fields
        if (!title || !content || !userId) {
            return res.status(400).json({error: 'Please enter a post title and content'});
        }

        // Create a new Post
        const post = await Post.create({
            userId, title, content
        });

        // Send success response
        res.status(201).json({
            message: 'Post created successfully',
            post: post.toJSON()
        });

    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({error: 'Internal server error'});
    }
};

export const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
    const posts = await Post.findAll();
    if (posts.length === 0) {
        return res.status(404).json({error: 'No posts found'});
    }
    res.status(200).json({posts});
}

export const getPostByPostId = async (req: Request, res: Response, next: NextFunction) => {
    const {postId} = req.params;

    if (!postId) {
        return res.status(400).json({error: 'Please enter a post id'});
    }

    const post = await Post.findByPk(postId)
    if (!post) {
        return res.status(404).json({error: 'Post not found'});
    }
    res.status(200).json({post});
}

export const getAllPostsByUserId = async (req: Request, res: Response, next: NextFunction) => {
    const {userId} = req.params;

    if (!userId) {
        return res.status(400).json({error: 'Please enter a user id'});
    }

    const posts = await Post.findAll({
        where: {userId}
    });

    if (posts.length === 0) {
        return res.status(404).json({error: 'No posts found for this user'});
    }

    res.status(200).json({posts});
}

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    const {title, content} = req.body as { title: string, content: string };
    ;
    const {id} = req.params;

    if (!id) {
        return res.status(400).json({error: 'Post ID is required'});
    }
    if (!title || !content) {
        return res.status(400).json({error: 'Title and content are required'});
    }

    try {
        const post = await Post.findByPk(id)

        if (!post) {
            return res.status(404).json({error: 'Post not found'});
        }
        await post.set({title, content}).save();

        res.status(200).json({post});

    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({error: 'Internal server error'});
    }
};

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;

    if (!id) {
        return res.status(400).json({error: 'Post ID is required'});
    }

    try {
        const post = await Post.findByPk(id);

        if (!post) {
            return res.status(404).json({error: 'Post not found'});
        }

        await post.destroy();
        res.status(200).json({message: 'Post deleted successfully'});

    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({error: 'Internal server error'});
    }
};
