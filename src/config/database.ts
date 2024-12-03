import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
// Objetivo de este archivo:
// -Configurar la instancia de Prisma
// -Gestionar la conexión
// -Manejar correctamente el cierre de la conexión con la base de datos.

dotenv.config(); // Cargar las variables de entorno desde el archivo .env

const prisma = new PrismaClient(); // Crear una instancia de PrismaClient para interactuar con la base de datos

export { prisma };
