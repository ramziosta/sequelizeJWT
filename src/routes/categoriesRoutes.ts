import {Router} from 'express';
import {createCategory, getCategoriesByPostId} from '../controllers/categoryController';

const categoryRouter: Router = Router();

// categories routes
categoryRouter.post('/:postId/categories', createCategory);
categoryRouter.get('/:postId/categories', getCategoriesByPostId);

export default categoryRouter;