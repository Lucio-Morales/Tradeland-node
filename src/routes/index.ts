import { Router } from 'express';
import userRouter from './userRoutes';

const mainRouter = Router();

mainRouter.use('/user', userRouter);

export default mainRouter;
