import { Router, Request, Response } from 'express';
import * as genresController from '../controllers/genre.controller';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { validate } from '../middlewares/validateRequest';
import { createGenreSchema } from '../schemas/genre.schema';

const router = Router();

router.use(isAuthenticated); // Middleware to protect all routes

router.post('/', validate(createGenreSchema), genresController.handleCreateGenre);
router.get('/', genresController.handleGetAllGenres);
router.get('/:id', genresController.handleGetGenreById);
router.put('/:id', validate(createGenreSchema), genresController.handleUpdateGenre);
router.delete('/:id', genresController.handleDeleteGenre);

export default router;