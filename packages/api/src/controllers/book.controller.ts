import { Request, Response } from 'express';
import * as bookService from '../services/book.service';

// Function to add a new book
export const addBook = async (req: Request, res: Response): Promise<void> => {

  try {
    const userId = req.user?.id; // Get user ID from authenticated request

    // Get book data from request body
    const bookData = { ...req.body, userId };

    // Validate required fields
    if (!bookData.title) {
      res.status(400).json({ message: 'El título es obligatorio.' });
      return;
    }

    // Create the book using the book service
    const newBook = await bookService.createbook(bookData);
    
    // Return the created book
    res.status(201).json(newBook);
  } catch (error) {    
    res.status(500).json({ message: 'Error creating book.', error });
  }
};

// TODO: Add userId to the controller methods
// Function to fetch all books
export const fetchAllBooks = async (req: Request, res: Response): Promise<void> => {
  console.log('>> Fetching all books...');

  try {
    const userId = req.user?.id; // Get user ID from authenticated request

    // Get all books for the user
    const books = await bookService.getAllBooks(userId);

    // Check if books were found
    if (books.length === 0) {
      res.status(404).json({ message: 'No books found.' });
      return;
    }

    // Return the list of books
    console.log('- Books fetched successfully, total Books in DB:', books.length);
    res.status(200).json(books);    
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Error obtaining books.', error });
  }
};

// Function to delete a book by ID
export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  const bookId = req.params.id;

  try {
    // Validate book ID
    if (!bookId) {
      res.status(400).json({ message: 'Book ID is required.' });
      return;
    }

    // Delete the book using the book service
    const deletedBook = await bookService.deleteBook(bookId);

    // Return the deleted book
    console.log(`- Book with ID ${bookId} deleted successfully.`);
    res.status(200).json(deletedBook);
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Error deleting book.', error });
  }
}

// Function to fetch a book by ID
export const getBookById = async (req: Request, res: Response): Promise<void> => {
  const bookId = req.params.id;

  try {
    // Validate book ID
    if (!bookId) {
      res.status(400).json({ message: 'Book ID is required.' });
      return;
    }

    // Fetch the book using the book service
    const book = await bookService.getBookById(bookId);

    // Check if the book was found
    if (!book) {
      res.status(404).json({ message: 'Book not found.' });
      return;
    }

    // Return the book details
    console.log(`- Book with ID ${bookId} fetched successfully.`);
    res.status(200).json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ message: 'Error fetching book.', error });
  }
}

// Function to update a book by ID
export const updateBook = async (req: Request, res: Response): Promise<void> => {
  const bookId = req.params.id;
  const bookData = req.body;

  try {
    // Validate book ID
    if (!bookId) {
      res.status(400).json({ message: 'Book ID is required.' });
      return;
    }

    // Validate required fields
    if (!bookData.title) {
      res.status(400).json({ message: 'El título es obligatorio.' });
      return;
    }

    // Update the book using the book service
    const updatedBook = await bookService.updateBook(bookId, bookData);

    // Return the updated book
    console.log(`- Book with ID ${bookId} updated successfully.`);
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Error updating book.', error });
  }
}