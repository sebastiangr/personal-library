import { prisma } from '../prisma/client';
import { Book, Prisma } from '@prisma/client';

// Type definitions for book creation and update data
// These types are used to define the structure of book data when creating or updating a book
export type BookCreateData = Prisma.BookCreateInput;
export type BookUpdateData = Prisma.BookUpdateInput;

// Function to create a new book
// This function takes book data as input and returns the created book object
export const createBook = async (data: BookCreateData): Promise<Book> => {
  return prisma.book.create({
    data,
  });
};

// Function to fetch all books
// This function retrieves all books from the database, ordered by creation date
export const getAllBooks = async (userId: string): Promise<Book[]> => {
  return prisma.book.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

// Function to fetch a book by its ID
// This function takes a book ID and user ID as input and returns the book if it exists
export const getBookById = async (id: string, userId: string): Promise<Book | null> => {
  return prisma.book.findFirst({
    where: {
      id,
      userId,
    },
  });
};

// Function to update a book by its ID
// This function takes a book ID, user ID, and update data as input and returns the updated book object
export const updateBook = async (id: string, userId: string, data: BookUpdateData): Promise<Book | null> => {
  try {    
    // It uses 'updateMany' to ensure that only the book belonging to the user can be updated
    const result = await prisma.book.updateMany({
      where: {
        id,
        userId,
      },
      data,
    });

    // If no rows were updated, it means the book was not found or did not belong to the user    
    if (result.count === 0) {
      return null;
    }
    // If the update was successful, fetch the updated book
    return getBookById(id, userId);
  } catch (error) {
    throw error;
  }
};

// Function to delete a book by its ID
// This function takes a book ID and user ID as input and deletes the book if it exists
export const deleteBook = async (id: string, userId: string): Promise<Book | null> => {
    
  const bookToDelete = await getBookById(id, userId);

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

// export const getAllBooks = async (userId: string): Promise<Book[]> => {
//   try {
//     const books = await prisma.book.findMany({
//       where: {
//         userId: userId, // Filter books by user ID
//       },
//       orderBy: {
//         createdAt: 'desc',
//       },            
//     });
//     return books;
//   } catch (error) {
//     console.error('Error fetching books:', error);
//     throw new Error('Failed to fetch books');
//   }
// };













// // Function to delete a book by its ID
// // This function takes the ID of the book to delete as input and returns a boolean indicating success
// export const deleteBook = async (bookId: string): Promise<Book> => {
//   try {
//     const deletedBook = await prisma.book.delete({
//       where: {
//         id: bookId,
//       },
//     });
//     return deletedBook;
//   } catch (error) {
//     console.error('Error deleting book:', error);
//     throw new Error('Failed to delete book');
//   }
// }

// // Function to fetch a book by its ID
// // This function takes the ID of the book to fetch as input and returns the book object or null if not found
// export const getBookById = async (bookId: string): Promise<Book | null> => {
//   try {
//     const book = await prisma.book.findUnique({
//       where: {
//         id: bookId,
//       },
//     });
//     return book;
//   } catch (error) {
//     console.error('Error fetching book by ID:', error);
//     throw new Error('Failed to fetch book by ID');
//   }
// }

// // Function to update a book by its ID
// // This function takes the ID of the book to update and the new data as input, and returns the updated book object
// export const updateBook = async (bookId: string, bookData: Partial<BookCreateData>): Promise<Book> => {
//   try {
//     const updatedBook = await prisma.book.update({
//       where: {
//         id: bookId,
//       },
//       data: bookData,
//     });
//     return updatedBook;
//   } catch (error) {
//     console.error('Error updating book:', error);
//     throw new Error('Failed to update book');
//   }
// }