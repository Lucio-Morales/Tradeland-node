import { Router } from 'express';
import userRouter from './userRoutes';
import authRoutes from './authRoutes';

const mainRouter = Router();

mainRouter.use('/user', userRouter).use('/auth', authRoutes);

export default mainRouter;
