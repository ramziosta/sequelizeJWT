import express, { Router } from 'express';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController';
import { createPost, getAllPosts, getAllPostsByUserId, getPostByPostId, updatePost, deletePost } from '../controllers/postController';
const router: Router = Router();


// user routes
router.post('/users', createUser);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);


// post routes
router.post('/posts', createPost);
router.get('/posts', getAllPosts);
router.get('/posts/:userId/posts', getAllPostsByUserId);
router.get('/posts/:userId',getPostByPostId);
router.put('/posts/:postId', updatePost);
router.delete('/posts/:id', deletePost)


export default router;