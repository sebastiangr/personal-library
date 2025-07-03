import { Request, Response } from 'express';
import * as bookService from '../services/book.service';

// Function to add a new book
export const handleCreateBook = async (req: Request, res: Response): Promise<void> => {

  try {
    const userId = req.user!.id; // Get user ID from authenticated request NOT null

    // Get book data from request body
    const bookData = { ...req.body, userId };

    // Validate required fields
    if (!bookData.title) {
      res.status(400).json({ message: 'El título es obligatorio.' });
      return;
    }

    // Create the book using the book service
    const newBook = await bookService.createBook(bookData);
    
    // Return the created book
    res.status(201).json(newBook);
  } catch (error) {    
    console.error("Error in function addBook:", error);
    res.status(500).json({ message: 'Error creating book.', error });
  }
};

// Function to fetch all books
export const handleGetAllBooks = async (req: Request, res: Response): Promise<void> => {
  console.log('>> Fetching all books...');

  try {
    const userId = req.user!.id; // Get user ID from authenticated request NOT null

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
    console.error('Error fetching books function fetchAllBooks:', error);
    res.status(500).json({ message: 'Error obtaining books.', error });
  }
};

// Function to fetch a book by ID
export const handleGetBookById = async (req: Request, res: Response): Promise<void> => {

  try {
    const userId = req.user!.id;
    const { id: bookId } = req.params;
    
    const book = await bookService.getBookById(bookId, userId);

    // Validate book ID
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
export const handleUpdateBook = async (req: Request, res: Response): Promise<void> => {

  try {

    const userId = req.user!.id; // Get user ID from authenticated request NOT null
    const { id: bookId } = req.params; // Get book ID from request parameters
    const bookData = req.body; // Get book data from request body

    const updateBook = await bookService.updateBook(bookId, userId, bookData);

    if (!updateBook) {
      res.status(404).json({ message: 'Book not found.' });
      return;
    }

    console.log(`- Book with ID ${bookId} updated successfully.`);
    res.status(200).json(updateBook);

  } catch (error: any) {
    console.error('Error in updateBookById:', error);
    
    if (error.code === 'P2002') {
      res.status(409).json({ message: 'Book with this ISBN already exists.' });      
    } else {
      res.status(500).json({ message: 'Error updating book.', error });
    }    
  }
}

// Function to delete a book by ID
export const handleDeleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id; // Get user ID from authenticated request NOT null
    const { id: bookId } = req.params; // Get book ID from request parameters

    const deletedBook = await bookService.deleteBook(bookId, userId);

    if (!deletedBook) {
      res.status(404).json({ message: 'Book not found.' });
      return;
    }

    console.log(`- Book with ID ${bookId} deleted successfully.`);    
    res.status(204).send();
  } catch (error) {
    console.error('Error in deleteBookById:', error);
    res.status(500).json({ message: 'Error deleting book.', error });
  }
}