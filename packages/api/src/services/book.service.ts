import { prisma } from '../prisma/client';
// import { Book, Prisma } from '@prisma/client';

// Type definitions for book creation and update data
// These types are used to define the structure of book data when creating or updating a book
// export type BookCreateData = Prisma.BookCreateInput;
// export type BookUpdateData = Prisma.BookUpdateInput;

import {
  Book,
  Prisma,
  BookStatus,
  ReadStatus,
  BookFormat,
  BookType
} from '@prisma/client';

// TODO: Finish adding all fields to the BookCreationInput type (2.2 step)
// This interface defines the structure of the input data required to create a new book
interface BookCreationInput {
  title: string;
  subtitle?: string;

  isbn_13?: string;
  isbn_10?: string;
  
  published_year?: number;
  edition?: string;
  page_count?: number;
  language?: string;
  description?: string;
  cover_image_url?: string;
  small_thumbnail_url?: string;
  
  status?: BookStatus;
  read_status?: ReadStatus;
  format?: BookFormat;
  type?: BookType;
  
  // Relational fields
  ownerId: string;
  authorIds: string[];
  genreIds?: string[];
  publisherId?: string;
}

// Function to create a new book
export const createBook = async (data: BookCreationInput): Promise<Book> => {
  const { title, ownerId, authorIds, genreIds, publisherId, ...otherData } = data;

  return prisma.book.create({
    data: {
      title,
      ...otherData,
      owner: { connect: { id: ownerId } }, 
      authors: {
        connect: authorIds.map(id => ({ id })),
      },
      genres: {
        connect: genreIds?.map(id => ({ id })),
      },
      publisher: publisherId ? { connect: { id: publisherId } } : undefined,
    }
  });
};

// Function to fetch all books
export const getAllBooks = async (ownerId: string): Promise<Book[]> => {
  return prisma.book.findMany({
    where: { ownerId: ownerId },
    include: {
      authors: true,
      genres: true,
      publisher: true
    },
    orderBy: { createdAt: 'desc' },
  });
};

// Function to fetch a book by its ID
export const getBookById = async (id: string, ownerId: string): Promise<Book | null> => {
  return prisma.book.findFirst({
    where: { id, ownerId: ownerId },
    include: {
      authors: true,
      genres: true,
      publisher: true
    },    
  });
};

// Function to update a book by its ID
// This function takes a book ID, user ID, and update data as input and returns the updated book object
export const updateBook = async (id: string, ownerId: string, data: BookCreationInput): Promise<Book | null> => {
  try {    
    // It uses 'updateMany' to ensure that only the book belonging to the user can be updated
    const result = await prisma.book.updateMany({
      where: {
        id,
        ownerId,
      },
      data,
    });

    // If no rows were updated, it means the book was not found or did not belong to the user    
    if (result.count === 0) {
      return null;
    }
    // If the update was successful, fetch the updated book
    return getBookById(id, ownerId);
  } catch (error) {
    throw error;
  }
};

// Function to delete a book by its ID
// This function takes a book ID and user ID as input and deletes the book if it exists
export const deleteBook = async (id: string, ownerId: string): Promise<Book | null> => {
    
  const bookToDelete = await getBookById(id, ownerId);

  if (!bookToDelete) {
    // if the book does not exist, return null
    return null;
  }

  // Si existe, procedemos a borrarlo.
  await prisma.book.delete({
    where: {
      id: id,
    },
  });
  
  return bookToDelete;
};
