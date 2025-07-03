import { Router, Request, Response } from "express";
import * as bookController from "../controllers/book.controller";
import { validate } from "../middlewares/validateRequest";
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { createBookSchema, updateBookSchema } from "../schemas/book.schema";
 
const router = Router();

// Route to fetch all books GET
// This route is protected by the isAuthenticated middleware
// It ensures that only authenticated users can access it
// We can also add validation for the request body using Zod schemas ***
router.use(isAuthenticated); // Middleware to protect all routes

// Route to add a new book POST
router.post('/', validate(createBookSchema), bookController.handleCreateBook);
// router.post("/", (req: Request, res: Response) => {
//   bookController.addBook(req, res);
// });

// Route to fetch all books GET
router.get('/', bookController.handleGetAllBooks);
// router.get("/", async (req: Request, res: Response, next) => {
//   bookController.fetchAllBooks(req, res);
// });

// Route to delete a book by ID DELETE
router.delete('/:id', bookController.handleDeleteBook);
// router.delete("/:id", (req: Request, res: Response) => {
//   bookController.deleteBook(req, res);
// });

// Route to fetch a book by ID GET
router.get('/:id', bookController.handleGetBookById);
// router.get("/:id", (req: Request, res: Response) => {
//   bookController.getBookById(req, res);pnp
// });

// Route to update a book by ID PUT
router.put('/:id', validate(updateBookSchema), bookController.handleUpdateBook);
// router.put("/:id", (req: Request, res: Response) => {
//   bookController.updateBook(req, res);
// });

export default router;