import {Router} from 'express';
import {createUser, getAllUsers, getUserById, updateUser, deleteUser, userLogin} from '../controllers/userController';
//import {validatePostRequest, validateUserRequest} from "../middleware/middleware";

const userRouter: Router = Router();

// login
userRouter.post('/login', userLogin)

// user routes
userRouter.post('/users', createUser);
userRouter.post('/users', createUser);
userRouter.get('/users', getAllUsers);
userRouter.get('/users/:id', getUserById);
userRouter.put('/users/:id', updateUser);
userRouter.delete('/users/:id', deleteUser);

export default userRouter;