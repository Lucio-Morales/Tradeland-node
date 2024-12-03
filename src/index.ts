import express from 'express';
import { prisma } from './config/database';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor on papi');
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Conectamos a la base de datos antes de iniciar el servidor
    await prisma.$connect();
    console.log('Conexión a la base de datos establecida exitosamente.');

    // Iniciamos el servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1); // Si no se puede conectar, cerramos el proceso
  }
};

process.on('SIGINT', async () => {
  console.log('Cerrando la conexión con Prisma...');
  await prisma.$disconnect();
  process.exit(0);
});

startServer();
