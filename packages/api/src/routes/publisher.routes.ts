import { Router, Request, Response } from "express";
import * as publisherController from "../controllers/publisher.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { validate } from "../middlewares/validateRequest";
import { createPublisherSchema } from "../schemas/publisher.schema";

const router = Router();

router.use(isAuthenticated); // Middleware to protect all routes

router.post('/', validate(createPublisherSchema), publisherController.handleCreatePublisher);
router.get('/', publisherController.handleGetAllPublishers);
router.get('/:id', publisherController.handleGetPublisherById);
router.put('/:id', validate(createPublisherSchema), publisherController.handleUpdatePublisher);
router.delete('/:id', publisherController.handleDeletePublisher);

// router.get('/', (req: Request, res: Response) => {
//   res.status(501).json({ message: 'Hello stranger: Publisher routes not implemented yet.' });
// });

// router.post('/', (req: Request, res: Response) => {
//   res.status(200).json({
//     message: 'Publisher created successfully (dummy response)',
//     publisher: {
//       id: 'dummy-id-123',
//       name: 'Dummy Publisher',
//       country: 'USA',
//       city:  'New York',
//       website: 'http://www.dummypublisher.com',
//     },
//   });
// });

// router.get('/:id', (req: Request, res: Response) => {
//   res.status(200).json({
//     message: `Publisher with ID ${req.params.id} fetched successfully (dummy response)`,
//     publisher: {
//       id: req.params.id,
//       name: 'Dummy Publisher',
//       country: 'USA',
//       city:  'New York',
//       website: 'http://www.dummypublisher.com',
//     },
//   });
// });

// router.put('/:id', (req: Request, res: Response) => {
//   res.status(200).json({
//     message: `Publisher with ID ${req.params.id} updated successfully (dummy response)`,
//     publisher: {
//       id: req.params.id,
//       name: 'Dummy Publisher',
//       country: 'USA',
//       city:  'New York',
//       website: 'http://www.dummypublisher.com',
//     },
//   });
// });

// router.delete('/:id', (req: Request, res: Response) => {
//   res.status(200).json({
//     message: `Publisher with ID ${req.params.id} deleted successfully (dummy response)`,
//   });
// });

export default router;