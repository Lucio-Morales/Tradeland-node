import { Router } from 'express';
import { getUser, login, register } from '../controllers/index';

const userRouter = Router();

userRouter
  .post('/register', register)
  .post('/login', login)
  .get('/get_user', getUser);

export default userRouter;
