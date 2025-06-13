import { Router, Request, Response } from "express";
import * as bookController from "../controllers/book.controller";

const router = Router();

// Route to add a new book POST
router.post("/", (req: Request, res: Response) => {
  bookController.addBook(req, res);
});

// Route to fetch all books GET
router.get("/", async (req: Request, res: Response, next) => {
  bookController.fetchAllBooks(req, res);
});

// Route to delete a book by ID DELETE
router.delete("/:id", (req: Request, res: Response) => {
  bookController.deleteBook(req, res);
});

// Route to fetch a book by ID GET
router.get("/:id", (req: Request, res: Response) => {
  bookController.getBookById(req, res);
});

// Route to update a book by ID PUT
router.put("/:id", (req: Request, res: Response) => {
  bookController.updateBook(req, res);
});

export default router;