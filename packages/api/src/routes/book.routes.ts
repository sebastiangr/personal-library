import { Router, Request, Response } from "express";
import * as bookController from "../controllers/book.controller";

const router = Router();

// Route to add a new book POST
// 
router.post("/", (req: Request, res: Response) => {
  bookController.addBook(req, res);
});

export default router;