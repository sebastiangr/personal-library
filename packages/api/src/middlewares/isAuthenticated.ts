import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extender el tipo Request de Express para incluir la propiedad 'user'
declare global {
  namespace Express {
    export interface Request {
      user?: any; // Puedes definir un tipo más estricto si quieres
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

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('La clave secreta de JWT no está configurada.');
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = (decoded as any).user; // Añadimos el payload del token a la request
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token no válido o expirado.' }); // 403 Forbidden
  }
};