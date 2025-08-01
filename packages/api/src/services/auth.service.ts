import { prisma } from '../prisma/client';
import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Tipo para los datos de registro
export type UserRegistrationData = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
export type UserLoginData = Omit<UserRegistrationData, 'name'>;

export const registerUser = async (data: UserRegistrationData): Promise<User> => {
  const { email, password_hash: plainPassword, name } = data;

  // 1. Hashear la contraseña
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(plainPassword, salt);

  // 2. Crear el usuario en la base de datos
  const user = await prisma.user.create({
    data: {
      email,
      password_hash: hashedPassword,
      name,
    },
  });

  // 3. Devolvemos el usuario sin la contraseña
  const { password_hash, ...userWithoutPassword } = user;
  return userWithoutPassword as User;
};

export const loginUser = async (credentials: UserLoginData): Promise<{ token: string; user: Omit<User, 'password_hash'>; }> => {
  const { email, password_hash: plainPassword } = credentials;

  // 1. Buscar al usuario por email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('Credenciales inválidas'); // Error genérico por seguridad
  }

  // 2. Comparar la contraseña enviada con la hasheada en la DB
  const isMatch = await bcrypt.compare(plainPassword, user.password_hash);

  if (!isMatch) {
    throw new Error('Credenciales inválidas'); // Mismo error genérico
  }

  // 3. Generar el token JWT si todo es correcto
  const payload = {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  };

  // El 'JWT_SECRET' debe estar en tu archivo .env
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('La clave secreta de JWT no está configurada.');
  }

  const token = jwt.sign(payload, secret, { expiresIn: '1d' }); // El token expira en 1 día

  const { password_hash, ...userWithoutPassword } = user;

  return { token, user: userWithoutPassword }
};
