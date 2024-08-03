import {Request, Response, NextFunction} from "express";
import Post from '../models/postModel';
import Comment from "../models/commentModel";

export const createComment = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const {content, postId, userId} = req.body;
        if (content && postId && userId) {
            try {
                const comment = await Comment.create({content, postId, userId});
                return res.status(200).send('Comment created successfully');
            } catch (error) {
                return res.status(400).send("Failed to create comment");
            }
        } else {
            return res.status(400).send("Missing required fields");
        }
    } catch (error) {
        return res.status(400).send("Error");
    }
}

export const getCommentsByPostId = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        if (!req.query.id) {
            return res.status(400).send("Id is required");
        }

        if (!/^[0-9]*$/.test(req.query.id as string)) {
            return res.status(400).send("Invalid id format");
        }

        const id: number = Number(req.query.id);
        const post = await Post.findByPk(id, {
            attributes: [],
            include: [
                { model: Comment, attributes: [["content", "content"]] }
                //! Error Here
            ],
        });

        if (post) {
            return res.send(post);
        } else {
            return res.status(400).send("Invalid post id");
        }
    } catch (error) {
        return res.status(400).send("Internal Server Error");
    }
}
