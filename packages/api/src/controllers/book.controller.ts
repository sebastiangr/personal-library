import { Request, Response } from 'express';
import * as bookService from '../services/book.service';

export const addBook = async (req: Request, res: Response) => {

  try {
    const MOCK_USER_ID = "wszxwub7"; // Replace with actual user ID from authentication context

    // Get book data from request body
    const bookData = { ...req.body, userId: MOCK_USER_ID };

    // Validate required fields
    if (!bookData.title) {
      return res.status(400).json({ message: 'El título es obligatorio.' });
    }

    // Create the book using the book service
    const newBook = await bookService.createbook(bookData);
    
    res.status(201).json(newBook);
  } catch (error) {    
    res.status(500).json({ message: 'Error al crear el libro.'});
  }
};