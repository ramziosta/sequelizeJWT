import Post from '../models/postModel';
import Category from '../models/categoryModel';
import {NextFunction, Request, Response} from "express";
import PostCategories from "../models/postCategoriesModel";
import CategoryInstance from "../models/categoryModel";
import Comment from "../models/commentModel";

// POST /:postId/categories: Create a new category for a post
// GET /:postId/categories: Get categories for a specific post

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    const { category } = req.body as { category: string[] };
    const id = req.params as { id: string };


    try {
        if (!category ) {
            return res.status(400).json({ error: 'Please enter at least one category' });
        }

        // Check for existing categories and create new ones if necessary
        const createdCategories: Category[] = [];
        for (const categoryName of category) {
            let existingCategory = await Category.findOne({ where: { name: categoryName } });
            if (!existingCategory) {
                existingCategory = await Category.create({ name: categoryName });
                createdCategories.push(existingCategory);
            } else {
                createdCategories.push(existingCategory);
            }
        }

        // Find the post
        const post = await Post.findByPk(Number(id));
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Create PostCategory records
        const postCategories = createdCategories.map(category => ({
            postId: post.id,
            categoryId: category.id
        }));

        await PostCategories.bulkCreate(postCategories);

        // Include the categories in the response (if needed)
        const updatedPost = await Post.findByPk(Number(id), {
            include: [{ model: Category }]
        });

        res.status(200).json(updatedPost);
    }
    catch (error) {
        console.error('Error creating categories:', error);
        res.status(500).json({ error: 'Failed to create categories' });
    }
};

export const getCategoriesByPostId = async (req: Request, res: Response, next: NextFunction) => {
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
    res.status(200).json({post.category});
}
