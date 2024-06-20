import { Router } from 'express';
import * as UserController from '../controllers/usersController.js';
import { authUserMiddleware, checkIfAdminMiddleware } from '../middlewares/auth.middlewares.js';

const userRouter = Router();

userRouter.post('/register', UserController.registerUser);
userRouter.post('/login', UserController.loginUser);
userRouter.get('/me', authUserMiddleware, UserController.getUserInfo);
userRouter.put('/:id/:role', checkIfAdminMiddleware, UserController.changeUserRole);

export default userRouter;