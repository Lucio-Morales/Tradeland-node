import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

if (!SECRET) {
  throw new Error('Environment variable JWT_SECRET must be defined');
}

// FUNCIONES //
export const generateToken = (payload: object): string => {
  return jwt.sign(payload, SECRET);
};

export const verifyToken = (token: string): object | null => {
  try {
    return jwt.verify(token, SECRET) as object;
  } catch (error) {
    return null;
  }
};
