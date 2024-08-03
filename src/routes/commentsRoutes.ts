import { Router } from 'express';
import {createComment, getCommentsByPostId} from '../controllers/commentController';


const commentsRouter: Router = Router();

// comments  routes
commentsRouter.post('/:postId/comments', createComment);
commentsRouter.get('/:postId/comments', getCommentsByPostId);

export default commentsRouter;