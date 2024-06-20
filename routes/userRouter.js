import { Router } from 'express';
import * as UserController from '../controllers/usersController.js';

const userRouter = Router();

userRouter.post('/register', UserController.registerUser);
userRouter.post('/login', UserController.loginUser);
userRouter.get('/me', UserController.getUserInfo);
userRouter.put('/:id/:role', UserController.changeUserRole);

export default userRouter;