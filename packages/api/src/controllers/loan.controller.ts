import { Request, Response } from 'express';
import * as loanService from '../services/loan.service';

export const handleLoanBook = async (req: Request, res: Response): Promise<void> => {
  
  try {
    const ownerId = req.user!.id;
    const { bookId } = req.params;
    const { borrowerId, expectedReturnDate } = req.body;

    if (ownerId === borrowerId) {
      res.status(400).json({ message: 'El propietario no puede ser el prestatario.' });
      return;
    }

    const result = await loanService.loanBook(bookId, ownerId, borrowerId, expectedReturnDate);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const handleReturnBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const ownerId = req.user!.id;
    const { bookId } = req.params;

    const result = await loanService.returnBook(bookId, ownerId);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const handleGetLentBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const loans = await loanService.getLeanBooks(userId);
    res.status(200).json(loans);
  } catch (error: any) {
    res.status(500).json({ message: "Error al obtener los libros prestados." });
  }
};  

export const handleGetBorrowedBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const loans = await loanService.getBorrowedBooks(userId);
    res.status(200).json(loans);
  } catch (error: any) {
    res.status(500).json({ message: "Error al obtener los libros pedidos." });
  }
};
