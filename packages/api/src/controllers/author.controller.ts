import { Request, Response } from 'express';
import * as authorService from '../services/author.service';

// Function to create a new author
export const handleCreateAuthor = async (req: Request, res: Response): Promise<void> => {
  try {
    const newAuthor = await authorService.createAuthor(req.body);
    res.status(201).json(newAuthor);
  } catch (error: any) {
    if (error.code === 'P2002') {
      res.status(409).json({ message: 'Author already exists' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  } 
};

// Function to get all authors
export const handleGetAllAuthors = async (req: Request, res: Response): Promise<void> => {
  try {
    const authors = await authorService.getAllAuthors();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to get an author by ID
export const handleGetAuthorById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const author = await authorService.findAuthorById(id);
    if (!author) {
      res.status(404).json({ message: 'Author not found' });
      return;
    }
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to update an author
export const handleUpdateAuthor = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const updatedAuthor = await authorService.updateAuthor(id, req.body);
    res.status(200).json(updatedAuthor);
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Author not found' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

// Function to delete an author
export const handleDeleteAuthor = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedAuthor = await authorService.deleteAuthor(id);
    res.status(200).json(deletedAuthor);
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Author not found' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};