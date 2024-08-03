import express, { Router } from 'express';
import {createUser, getAllUsers, getUserById, updateUser, deleteUser, userLogin} from '../controllers/userController';
import { createPost, getAllPosts, getAllPostsByUserId, getPostByPostId, updatePost, deletePost } from '../controllers/postController';
import {createCategory, getCategoriesByPostId } from '../controllers/categoryController';
import {validatePostRequest, validateUserRequest} from "../middleware/middleware";

const router: Router = Router();

// login
router.post('/login', userLogin)

// user routes
router.post('/users', createUser);
router.post('/users',validateUserRequest, createUser);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);


// post routes
router.post('/posts',validatePostRequest, createPost);
router.get('/posts', getAllPosts);
router.get('/posts/:userId/posts', getAllPostsByUserId);
router.get('/posts/:postId',getPostByPostId);
router.put('/posts/:postId', updatePost);
router.delete('/posts/:id', deletePost)

// categories routes
router.post('/:postId/categories', createCategory);
router.get('/:postId/categories', getCategoriesByPostId);

// comments  routes
// router.post('/:postId/comments', createComment);
// router.get('/:postId/comments', getCommentsByPostId);

export default router;