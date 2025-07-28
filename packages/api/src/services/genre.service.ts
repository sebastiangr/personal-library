import { prisma } from '../prisma/client';

import {
  Genre,
  Prisma
} from '@prisma/client';

interface GenreCreationInput {
  name: string;
  description?: string;
} 

export const createGenre = async (data: GenreCreationInput): Promise<Genre> => {
  return prisma.genre.create({
    data: {
      ...data,
    },
  });
};

export const getAllGenres = async (): Promise<Genre[]> => {
  return prisma.genre.findMany({
    orderBy: { name: 'asc' },
  });
}

export const getGenreById = async (id: string): Promise<Genre | null> => {
  return prisma.genre.findUnique({
    where: { id },
  });
}

export const updateGenre = async (id: string, data: Prisma.GenreUpdateInput): Promise<Genre> => {
  return prisma.genre.update({
    where: { id },
    data,
  });
};

export const deleteGenre = async (id: string): Promise<Genre> => {
  return prisma.genre.delete({
    where: { id },
  });
};
