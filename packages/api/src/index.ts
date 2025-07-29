
// TODO: Borrar comments
// // --- AÑADE ESTO AL PRINCIPIO DE TODO ---
// process.on('unhandledRejection', (reason, promise) => {
//   console.error('🔥🔥🔥 RECHAZO DE PROMESA NO MANEJADO 🔥🔥🔥');
//   console.error('Razón:', reason);
//   // La siguiente línea es opcional pero muy útil para ver dónde se originó
//   // console.error('Promesa:', promise);
// });

// process.on('uncaughtException', (err, origin) => {
//   console.error('🔥🔥🔥 EXCEPCIÓN NO CAPTURADA 🔥🔥🔥');
//   console.error('Error:', err);
//   console.error('Origen:', origin);
// });
// --- FIN DEL BLOQUE A AÑADIR ---

console.log("Iniciando...");
import express, { Request, Response } from 'express';
console.log("Importado express");
import dotenv from 'dotenv';
console.log("Importado dotenv");
import cors from 'cors';
console.log("Importado cors");

import { appTest } from './app';

import authRoutes from './routes/auth.routes'; // Import auth routes
console.log("Importado authRoutes");
import bookRoutes from './routes/book.routes'; // Import book routes
console.log("Importado bookRoutes");
import authorRoutes from './routes/author.routes';
console.log("Importado authorRoutes");
import publisherRoutes from './routes/publisher.routes'; // Import publisher routes
console.log("Importado publisherRoutes");
import genresRoutes from './routes/genre.routes';
console.log("Importado genresRoutes");
import loanRoutes from './routes/loan.routes';


// Load environment variables from .env file
dotenv.config();
console.log("Cargando variables de entorno desde .env");

const app = express();
const PORT = Number(process.env.PORT) || 3003;
console.log(`Puerto configurado: ${PORT}`);

// Middlewares
app.use(cors()); // Enables CORS for all routes
app.use(express.json()); // Enable JSON parsing for incoming requests
console.log("Middlewares configurados: CORS y JSON parsing");

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

app.use('/api/auth', authRoutes); // Use auth routes under /api/auth
app.use('/api/books', bookRoutes); // Use book routes under /api/books
app.use('/api/loans', loanRoutes); // Use loan routes under /api/loans
app.use('/api/authors', authorRoutes); // Use author routes under /api/authors
app.use('/api/publishers', publisherRoutes); // Use publisher routes under /api/publishers
app.use('/api/genres', genresRoutes); // Use genre routes under /api/genres




// app.use('/api/publishers¡', (req: Request, res: Response) => {
//   res.status(501).json({ message: 'Publisher routes not implemented yet.' });
// });
// app.use('/api/genres', (req: Request, res: Response) => {
//   res.status(501).json({ message: 'Genre routes not implemented yet.' });
// });

app.use('/coffee', (req: Request, res: Response) => {
  res.status(418).json({
    message: "I'm a teapot, I cannot brew coffee (dummy response)",
  });
});

// Inicia el servidor solo si no estamos en un entorno de test
if (process.env.NODE_ENV !== 'test') {
  appTest.listen(PORT, () => {
    console.log(`🚀 Server TEST running on http://localhost:${PORT}`);
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀  Server running on http://localhost:${PORT}`);
});



// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });