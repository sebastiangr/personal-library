import { Request, Response } from 'express';
import * as genreService from '../services/genre.service';

export const handleCreateGenre = async (req: Request, res: Response): Promise<void> => {
  try {
    const genreData = req.body; // Get genre data from request body

    // Validate required fields
    if (!genreData.name) {
      res.status(400).json({ message: 'El nombre del género es obligatorio.' });
      return;
    }

    // Create the genre using the genre service
    const newGenre = await genreService.createGenre(genreData);
    
    // Return the created genre
    res.status(201).json(newGenre);
  } catch (error) {
    console.error("Error in function handleCreateGenre:", error);
    res.status(500).json({ message: 'Error creating genre.', error });
  }
}

export const handleGetAllGenres = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get all genres
    const genres = await genreService.getAllGenres();

    // Check if genres were found
    if (genres.length === 0) {
      res.status(404).json({ message: 'No genres found.' });
      return;
    }

    // Return the list of genres
    res.status(200).json(genres);
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).json({ message: 'Error obtaining genres.', error });
  }
}

export const handleGetGenreById = async (req: Request, res: Response): Promise<void> => {
  try {
    const genreId = req.params.id; // Get genre ID from request parameters

    // Fetch the genre by ID
    const genre = await genreService.getGenreById(genreId);

    // Check if genre was found
    if (!genre) {
      res.status(404).json({ message: `Genre with ID ${genreId} not found.` });
      return;
    }

    // Return the genre
    res.status(200).json(genre);
  } catch (error) {
    console.error('Error fetching genre by ID:', error);
    res.status(500).json({ message: 'Error obtaining genre by ID.', error });
  }
}

export const handleUpdateGenre = async (req: Request, res: Response): Promise<void> => {
  try {
    const genreId = req.params.id; // Get genre ID from request parameters
    const genreData = req.body; // Get updated genre data from request body

    // Validate required fields
    if (!genreData.name) {
      res.status(400).json({ message: 'El nombre del género es obligatorio.' });
      return;
    }

    // Update the genre using the genre service
    const updatedGenre = await genreService.updateGenre(genreId, genreData);

    // Check if the genre was found and updated
    if (!updatedGenre) {
      res.status(404).json({ message: `Genre with ID ${genreId} not found.` });
      return;
    }

    // Return the updated genre
    res.status(200).json(updatedGenre);
  } catch (error) {
    console.error('Error updating genre:', error);
    res.status(500).json({ message: 'Error updating genre.', error });
  }
}

export const handleDeleteGenre = async (req: Request, res: Response): Promise<void> => {
  try {
    const genreId = req.params.id; // Get genre ID from request parameters

    // Delete the genre using the genre service
    const deletedGenre = await genreService.deleteGenre(genreId);

    // Check if the genre was found and deleted
    if (!deletedGenre) {
      res.status(404).json({ message: `Genre with ID ${genreId} not found.` });
      return;
    }

    // Return a success message
    res.status(200).json({ message: `Genre with ID ${genreId} deleted successfully.` });
  } catch (error) {
    console.error('Error deleting genre:', error);
    res.status(500).json({ message: 'Error deleting genre.', error });
  }
}