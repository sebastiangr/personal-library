import { PrismaClient } from '@prisma/client';

if (process.env.NODE_ENV === 'test' && !process.env.DATABASE_URL?.includes('test')) {
  throw new Error(
    '¡PELIGRO! Intento de ejecutar tests en una base de datos que no es de prueba. Revisa tu configuración de .env.'
  );
}

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

const getPrismaClient = () => {
  if (process.env.NODE_ENV === 'production') {
    return new PrismaClient();
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }
    return global.prisma;    
  }
}

prisma = getPrismaClient();

export { prisma };

// export const prisma = global.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== 'production') {
//   global.prisma = prisma;
// }