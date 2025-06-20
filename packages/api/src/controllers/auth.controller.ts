import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    // NOTA: Renombramos 'password' a 'password_hash' para que coincida con el tipo esperado
    const { email, password, name } = req.body;
    const newUser = await authService.registerUser({ email, password_hash: password, name});
    res.status(201).json(newUser);
  } catch (error: any) {
    // Si el usuario ya existe, Prisma lanzará un error con código P2002
    if (error.code === 'P2002') {
      res.status(409).json({ message: 'El correo electrónico ya está en uso.' });
    } else {
      res.status(500).json({ message: 'Error interno del servidor.' });
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const { token } = await authService.loginUser({ email, password_hash: password });
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(401).json({ message: error.message }); // 401 Unauthorized
  }
};