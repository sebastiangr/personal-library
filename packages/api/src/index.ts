import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth.routes'; // Import auth routes
import bookRoutes from './routes/book.routes'; // Import book routes
import authorRoutes from './routes/author.routes';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

// Middlewares
app.use(cors()); // Enables CORS for all routes
app.use(express.json()); // Enable JSON parsing for incoming requests

// Test route
app.get('/api', (req: Request, res: Response) => {
  res.json({ message: '¡Bienvenido a la API de la Biblioteca Personal!' });
});

app.get('/', (req: Request, res: Response) => {
  // res.json({ message: `Servidor corriendo en la raíz PORT: ${PORT}` });
  res.send(`
    <h1>Server running on localhost:${PORT}</h1>
    <p>Go to <a href="/api">/api</a> to test the API.</p>
  `);
});

// TODO: Routes, controllers and services for Publishers and Genres
app.use('/api/auth', authRoutes); // Use auth routes under /api/auth
app.use('/api/books', bookRoutes); // Use book routes under /api/books
app.use('/api/authors', authorRoutes); // Use author routes under /api/authors

app.listen(PORT, () => {
  console.log(`🚀  Server running on http://localhost:${PORT}`);
});