import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string;
      email: string;
      // Agrega más propiedades si necesitas
      [key: string]: any;
    };
  }
}
