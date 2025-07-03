import { Router } from "express";
import * as authorController from "../controllers/author.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { validate } from "../middlewares/validateRequest";
import { createAuthorSchema } from "../schemas/author.schema";

const router = Router();

router.use(isAuthenticated);

router.post('/', validate(createAuthorSchema), authorController.handleCreateAuthor);
router.get('/', authorController.handleGetAllAuthors);
router.get('/:id', authorController.handleGetAuthorById);
router.put('/:id', validate(createAuthorSchema), authorController.handleUpdateAuthor);
router.delete('/:id', authorController.handleDeleteAuthor);

export default router;