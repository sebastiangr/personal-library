import { Router, Request, Response } from "express";
import * as bookController from "../controllers/book.controller";
import * as loanController from "../controllers/loan.controller";
import { validate } from "../middlewares/validateRequest";
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { createBookSchema, updateBookSchema } from "../schemas/book.schema";
import { createLoanSchema } from "../schemas/loan.schema";
 
const router = Router();
router.use(isAuthenticated); // Middleware to protect all routes

router.post('/', validate(createBookSchema), bookController.handleCreateBook);
router.get('/', bookController.handleGetAllBooks);
router.delete('/:id', bookController.handleDeleteBook);
router.get('/:id', bookController.handleGetBookById);
router.put('/:id', validate(updateBookSchema), bookController.handleUpdateBook);

router.post('/:bookId/loan', validate(createLoanSchema), loanController.handleLoanBook);
router.post('/:bookId/return', loanController.handleReturnBook);

export default router;


// Route to fetch all books GET
// This route is protected by the isAuthenticated middleware
// It ensures that only authenticated users can access it
// We can also add validation for the request body using Zod schemas ***


// Route to add a new book POST

// router.post("/", (req: Request, res: Response) => {
//   bookController.addBook(req, res);
// });

// Route to fetch all books GET

// router.get("/", async (req: Request, res: Response, next) => {
//   bookController.fetchAllBooks(req, res);
// });

// Route to delete a book by ID DELETE

// router.delete("/:id", (req: Request, res: Response) => {
//   bookController.deleteBook(req, res);
// });

// Route to fetch a book by ID GET

// router.get("/:id", (req: Request, res: Response) => {
//   bookController.getBookById(req, res);pnp
// });

// Route to update a book by ID PUT

// router.put("/:id", (req: Request, res: Response) => {
//   bookController.updateBook(req, res);
// });