import { prisma } from '../prisma/client';
import { Author, Prisma } from '@prisma/client';

export const createAuthor = async (data: Prisma.AuthorCreateInput): Promise<Author> => {
  return prisma.author.create({
    data,
  });
};

export const getAllAuthors = async (): Promise<Author[]> => {
  return prisma.author.findMany({
    orderBy: { name: 'asc' },
  });
};

export const findAuthorById = async (id: string): Promise<Author | null> => {
  return prisma.author.findUnique({
    where: { id },
  });
};

export const updateAuthor = async (id: string, data: Prisma.AuthorUpdateInput): Promise<Author> => {
  return prisma.author.update({
    where: { id },
    data,
  });
};

export const deleteAuthor = async (id: string): Promise<Author> => {
  return prisma.author.delete({
    where: { id },
  });
};