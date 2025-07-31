import { Request, Response } from 'express';
import * as publisherService from '../services/publisher.service';

export const handleCreatePublisher = async (req: Request, res: Response): Promise<void> => {
  try {
    const publisherData = req.body; // Get publisher data from request body

    // Validate required fields
    if (!publisherData.name) {
      res.status(400).json({ message: 'El nombre del editor es obligatorio.' });
      return;
    }

    // Create the publisher using the publisher service
    const newPublisher = await publisherService.createPublisher(publisherData);
    
    // Return the created publisher
    res.status(201).json(newPublisher);
  } catch (error) {
    console.error("Error in function handleCreatePublisher:", error);
    res.status(500).json({ message: 'Error creating publisher.', error });
  }
}

export const handleGetAllPublishers = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get all publishers
    const publishers = await publisherService.getAllPublishers();

    // Check if publishers were found
    if (publishers.length === 0) {
      res.status(404).json({ message: 'No publishers found.' });
      return;
    }

    // Return the list of publishers
    res.status(200).json(publishers);
  } catch (error) {
    console.error('Error fetching publishers:', error);
    res.status(500).json({ message: 'Error obtaining publishers.', error });
  }
}

export const handleGetPublisherById = async (req: Request, res: Response): Promise<void> => {
  try {
    const publisherId = req.params.id; // Get publisher ID from request parameters

    // Fetch the publisher by ID
    const publisher = await publisherService.getPublisherById(publisherId);

    // Check if publisher was found
    if (!publisher) {
      res.status(404).json({ message: `Publisher with ID ${publisherId} not found.` });
      return;
    }

    // Return the publisher
    res.status(200).json(publisher);
  } catch (error) {
    console.error('Error fetching publisher by ID:', error);
    res.status(500).json({ message: 'Error obtaining publisher.', error });
  }
}

export const handleUpdatePublisher = async (req: Request, res: Response): Promise<void> => {
  try {
    const publisherId = req.params.id; // Get publisher ID from request parameters
    const publisherData = req.body; // Get publisher data from request body

    // Update the publisher using the publisher service
    const updatedPublisher = await publisherService.updatePublisher(publisherId, publisherData);

    // Check if publisher was updated
    if (!updatedPublisher) {
      res.status(404).json({ message: `Publisher with ID ${publisherId} not found.` });
      return;
    }

    // Return the updated publisher
    res.status(200).json(updatedPublisher);
  } catch (error) {
    console.error('Error updating publisher:', error);
    res.status(500).json({ message: 'Error updating publisher.', error });
  }
}

export const handleDeletePublisher = async (req: Request, res: Response): Promise<void> => {
  try {
    const publisherId = req.params.id; // Get publisher ID from request parameters

    // Delete the publisher using the publisher service
    const deletedPublisher = await publisherService.deletePublisher(publisherId);

    // Return success message
    res.status(200).json({ message: `Publisher ${deletedPublisher.name} deleted successfully.` });
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Publisher not found' });
    } else {
      console.error('Error deleting publisher:', error);
      res.status(500).json({ message: 'Error deleting publisher.', error });
    }
  }
}