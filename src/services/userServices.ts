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
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid credentials');

  const token = generateToken({ id: user.id, email: user.email });

  return { user: { id: user.id, email: user.email, name: user.name }, token };
};
