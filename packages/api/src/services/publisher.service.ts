import { prisma } from '../prisma/client';

// TODO: Review and finish Publisher service methods
import {
  Publisher,
  Prisma
} from '@prisma/client';

interface PublisherCreationInput {
  name: string;
  city?: string;
  country?: string;
  website?: string;
}

export const createPublisher = async (data: PublisherCreationInput): Promise<Publisher> => {
  return prisma.publisher.create({
    data: {
      ...data,
    },
  });
};

export const getAllPublishers = async (): Promise<Publisher[]> => {
  return prisma.publisher.findMany({
    orderBy: { name: 'asc' },
  });
};

export const getPublisherById = async (id: string): Promise<Publisher | null> => {
  return prisma.publisher.findUnique({
    where: { id },
  });
};

export const updatePublisher = async (id: string, data: Prisma.PublisherUpdateInput): Promise<Publisher> => {
  return prisma.publisher.update({
    where: { id },
    data,
  });
};

export const deletePublisher = async (id: string): Promise<Publisher> => {
  return prisma.publisher.delete({
    where: { id },
  });
};