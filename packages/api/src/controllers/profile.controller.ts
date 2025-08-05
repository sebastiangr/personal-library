import { Request, Response } from 'express';
import { prisma } from '../prisma/client';

export const getProfile = async (req: Request, res: Response) => {
  try {
    // req.user es añadido por el middleware isAuthenticated
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'No autorizado' });
    }
    console.log(`<profile.controller.ts> Obteniendo perfil para el usuario ID: ${userId}`);

    // Buscar usuario por id, omitiendo la contraseña
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, createdAt: true }
    });
    console.log(`<profile.controller.ts> User: ${user?.name}`);
    
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
