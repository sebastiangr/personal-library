import { prisma } from '../prisma/client';
import { Book } from '@prisma/client';

// Omit the fields that are generated automatically
// such as 'id', 'createdAt', and 'updatedAt' when creating a new book
export type BookCreateData = Omit<Book, 'id' | 'createdAt' | 'updatedAt'>;

// Function to create a new book
// This function takes book data as input and returns the created book object
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

// Function to fetch all books
// This function retrieves all books from the database, ordered by creation date
export const getAllBooks = async (userId: string): Promise<Book[]> => {
  try {
    const books = await prisma.book.findMany({
      where: {
        userId: userId, // Filter books by user ID
      },
      orderBy: {
        createdAt: 'desc',
      },            
    });
    return books;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw new Error('Failed to fetch books');
  }
};

// Function to delete a book by its ID
// This function takes the ID of the book to delete as input and returns a boolean indicating success
export const deleteBook = async (bookId: string): Promise<Book> => {
  try {
    const deletedBook = await prisma.book.delete({
      where: {
        id: bookId,
      },
    });
    return deletedBook;
  } catch (error) {
    console.error('Error deleting book:', error);
    throw new Error('Failed to delete book');
  }
}

// Function to fetch a book by its ID
// This function takes the ID of the book to fetch as input and returns the book object or null if not found
export const getBookById = async (bookId: string): Promise<Book | null> => {
  try {
    const book = await prisma.book.findUnique({
      where: {
        id: bookId,
      },
    });
    return book;
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    throw new Error('Failed to fetch book by ID');
  }
}

// Function to update a book by its ID
// This function takes the ID of the book to update and the new data as input, and returns the updated book object
export const updateBook = async (bookId: string, bookData: Partial<BookCreateData>): Promise<Book> => {
  try {
    const updatedBook = await prisma.book.update({
      where: {
        id: bookId,
      },
      data: bookData,
    });
    return updatedBook;
  } catch (error) {
    console.error('Error updating book:', error);
    throw new Error('Failed to update book');
  }
}