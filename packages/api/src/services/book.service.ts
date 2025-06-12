import { prisma } from '../prisma/client';
import { Book } from '@prisma/client';

// Omit the fields that are generated automatically
// such as 'id', 'createdAt', and 'updatedAt' when creating a new book
export type BookCreateData = Omit<Book, 'id' | 'createdAt' | 'updatedAt'>;

export const createbook = async (bookData: BookCreateData): Promise<Book> => {
  try {
    const newBook = await prisma.book.create({
      data: bookData,
    });
    return newBook;
  } catch (error) {
    console.error('Error creating book:', error);
    throw new Error('Failed to create book');
  }
};