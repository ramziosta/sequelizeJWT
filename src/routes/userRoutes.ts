import {Router} from 'express';
import {createUser, getAllUsers, getUserById, updateUser, deleteUser, userLogin, userLogout} from '../controllers/userController';
//import {validatePostRequest, validateUserRequest} from "../middleware/middleware";
import  {authenticateToken } from '../middleware/jwtAuth';

const userRouter: Router = Router();

// login logout
userRouter.post('/login', userLogin)
userRouter.post('/logout', userLogout);

// user routes
userRouter.post('/users', createUser);
userRouter.post('/users', createUser);
userRouter.get('/users', authenticateToken,getAllUsers);
userRouter.get('/users/:id', getUserById);
userRouter.put('/users/:id', updateUser);
userRouter.delete('/users/:id', deleteUser);

export default userRouter;