import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extender el tipo Request de Express para incluir la propiedad 'user'
declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: string;
        email: string;
      };      
    }
  }
}

export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formato "Bearer TOKEN"

  if (!token) {
    res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      // Este es un error del servidor, no del cliente.
      console.error('La clave secreta de JWT no está configurada.');
      res.status(500).json({ message: 'Error interno del servidor.' });
      return;
    }

    const decodedPayload = jwt.verify(token, secret);

    // Añadimos el payload del usuario a la request.
    // TypeScript ahora sabe que 'req.user' es una propiedad válida.
    req.user = (decodedPayload as any).user; 
    
    next();
  } catch (error) {
    // 403 Forbidden
    res.status(403).json({ message: 'Token no válido o expirado.' });
  }
};