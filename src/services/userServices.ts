import { CreateUserDTO } from 'src/types/userTypes';
import { prisma } from '../config/database';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt';

export const createUser = async ({ name, email, password }: CreateUserDTO) => {
  //Busco el usuario por su email para ver si ya esta en uso
  const existingUser = await prisma.user.findUnique({ where: { email } });

  // Si esta en uso, ERROR
  if (existingUser) {
    throw new Error('El correo electronico ya esta en uso.');
  }

  // Si no, hasheo la pass
  const hashedPassword = await bcrypt.hash(password, 10);

  // Creo al usuario y lo retorno
  return await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
};

export const loginUser = async (email: string, password: string) => {
  // Reviso que el usuario este registrado mediante su email:
  const user = await prisma.user.findUnique({ where: { email } });

  //Si no esta registrado, error.
  if (!user) {
    throw new Error('Credenciales invalidas.Registres para poder ingresar.');
  }

  // Si el usuario esta registrado, comparo y valido contraseñas:
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid credentials');

  // Si la contraseña es valida, genero un token con la info del user y lo retorno:
  const token = generateToken({ id: user.id, email: user.email });
  return { user: { id: user.id, email: user.email, name: user.name }, token };
};
// Una vez realizado el login y generado el token, el frontend debe recibirlo y almacenarlo de forma segura para realizar las proximas solicitudes.

export const getUserProfileData = async (userId: number) => {
  try {
    const userData = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userData) {
      throw new Error('User not found.');
    }
    return userData;
  } catch (error: any) {
    throw new Error('Error fetching user profile: ' + error.message);
  }
};
