import { NextFunction, Request, Response } from 'express';
import { CreateUserDTO } from 'src/types/userTypes';
import { createUser, loginUser } from '../services/index';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password }: CreateUserDTO = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ error: 'Todos los campos son obligatorios.' });
      return;
    }

    const newUser = await createUser({ name, email, password });

    res.status(201).json({
      message: 'Usuario registrado con exito.',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error: any) {
    if (error.message === 'El correo electronico ya esta en uso.') {
      res.status(409).json({ error: error.message });
    } else {
      console.error('Error al registrar el usuario:', error);
      res
        .status(500)
        .json({ error: 'Ocurrio un error al registrar el usuario.' });
    }
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    //Si no hay email o password, error:
    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    //Si estan todos los campos, ejecuto el service loginUser:
    const { user, token } = await loginUser(email, password);

    res.status(200).json({ user, token });
  } catch (error: any) {
    next(error);
  }
};

export const getUser = (req: Request, res: Response) => {};
