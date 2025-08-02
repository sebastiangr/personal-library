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
  // 1. Buscar token en header Authorization
  let token: string | undefined;
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  // 2. Si no está en header, buscar en cookies
  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('La clave secreta de JWT no está configurada.');
      res.status(500).json({ message: 'Error interno del servidor.' });
      return;
    }

    const decodedPayload = jwt.verify(token, secret);
    req.user = (decodedPayload as any).user;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token no válido o expirado.' });
  }
};