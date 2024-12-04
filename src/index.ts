import express from 'express';
import cors from 'cors';
import mainRouter from './routes';
import { prisma } from './config/database';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// app.use(cors({
//   origin: '*',  // Puedes especificar el origen permitido, por ejemplo, 'http://localhost:3000' si es necesario.
//   methods: ['GET', 'POST'],  // Métodos permitidos
//   allowedHeaders: ['Content-Type', 'Authorization'],  // Cabeceras permitidas
// }));
app.use(
  cors({
    origin: '*',
  })
);
app.use(express.json());

app.use('/', mainRouter);
app.use(errorHandler);
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
