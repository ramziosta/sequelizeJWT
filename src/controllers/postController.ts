import {Request, Response, NextFunction} from 'express';
import User from '../models/userModel';
import Post from '../models/postModel';
import Category from "../models/categoryModel";
import PostCategories from "../models/postCategoriesModel";
import Comment from "../models/commentModel";

// Define types for categories
interface CategoryInstance extends Category {
    id: number;
    name: string;
}

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {userId, title, content, category} = req.body as {
            title: string;
            content: string;
            category: string[],
            userId: number
        };

        // Check for existing categories and create new ones if necessary
        const createdCategories: CategoryInstance[] = [];
        for (const categoryName of category) {
            let category: Category | null = await Category.findOne({where: {name: categoryName}});
            if (!category) {
                category = await Category.create({name: categoryName});
                createdCategories.push(category as CategoryInstance);
            } else {
                createdCategories.push(category as CategoryInstance);
            }
        }

        // Create the post
        const post = await Post.create({userId, title, content});

        // Create PostCategory records
        const postCategories = category.map(name => {
            const category = createdCategories.find(c => c.name === name);
            if (!category) {
                throw new Error(`Category ${name} not found in created categories`);
            }
            return {
                postId: post.id,
                categoryId: category.id
            };
        });

        await PostCategories.bulkCreate(postCategories);
        res.status(201).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Failed to create post'});
    }
};

export const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
    const posts = await Post.findAll(
        {
            include: [
                {
                    model: Category,
                },
                {
                    model: Comment,
                },
            ],
        }
    );
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

    const post = await Post.findByPk(
        postId, {
            include: [
                {
                    model: Category,
                },

                {
                    model: Comment,
                },
            ],
        });

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
        where: {userId},
        include: [
            {
                model: Category,
            },
            {
                model: Comment,
            },
        ],
    });

    if (posts.length === 0) {
        return res.status(404).json({error: 'No posts found for this user'});
    }

    res.status(200).json({posts});
}

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    const {title, content} = req.body as { title: string, content: string };
    const {postId} = req.params;

    if (!postId) {
        return res.status(400).json({error: 'Please enter a post id'});
    }

    if (!title || !content) {
        return res.status(400).json({error: 'Title and content are required'});
    }

    try {
        // Find the post
        const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).json({error: 'Post not found'});
        }

        // Update the post
        await post.update({title, content});

        // Return the updated post
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
