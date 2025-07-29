import { Router } from 'express';
import * as loanController from '../controllers/loan.controller';
import { validate } from '../middlewares/validateRequest';
import { createLoanSchema } from '../schemas/loan.schema';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const router = Router();
router.use(isAuthenticated); // Middleware to protect all routes

// View borrowed and lent books
router.get('/lent', loanController.handleGetLentBooks);
router.get('/borrowed', loanController.handleGetBorrowedBooks);
router.get('/lent/history', loanController.handleGetLentBooksHistory);

export default router;