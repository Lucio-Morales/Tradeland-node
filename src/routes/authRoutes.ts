import { Router } from 'express';
import { userProfile } from '../controllers/profileControllers';
import { validateToken } from '../middlewares/auth';

const authRoutes = Router();

authRoutes.get('/user_profile', validateToken, userProfile);

export default authRoutes;
