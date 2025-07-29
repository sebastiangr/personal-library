import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes';
import bookRoutes from './routes/book.routes';
import authorRoutes from './routes/author.routes';
import publisherRoutes from './routes/publisher.routes';
import genresRoutes from './routes/genre.routes';
import loanRoutes from './routes/loan.routes';

const appTest = express();

appTest.use(cors());
appTest.use(express.json());

// Rutas públicas
appTest.use('/api/auth', authRoutes);

// Rutas protegidas (el middleware se aplica dentro de cada router)
appTest.use('/api/books', bookRoutes); // Use book routes under /api/books
appTest.use('/api/loans', loanRoutes); // Use loan routes under /api/loans
appTest.use('/api/authors', authorRoutes); // Use author routes under /api/authors
appTest.use('/api/publishers', publisherRoutes); // Use publisher routes under /api/publishers
appTest.use('/api/genres', genresRoutes); // Use genre routes under /api/genres

// Exportamos la app para que los tests la puedan usar
export { appTest };