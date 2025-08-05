import { PrismaClient } from '@prisma/client';

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