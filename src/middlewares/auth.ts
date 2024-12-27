import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    res.status(401).json({ message: 'Access token is missing' });
    return;
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Token is missing' });
    return;
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    res.status(403).json({ message: 'Invalid or expired token' });
    return;
  }

  (req as any).user = decoded;
  next();
};
