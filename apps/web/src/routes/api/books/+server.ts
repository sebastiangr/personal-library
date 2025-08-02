// apps/web/src/routes/api/books/+server.ts
import { json } from '@sveltejs/kit';
import { apiClient } from '$lib/api';
import type { Book } from '$lib/types';
import type { RequestHandler } from './$types';

// Manejador para POST /api/books
export const POST: RequestHandler = async ({ request, cookies }) => {
  const token = cookies.get('authToken');
  const bookData = await request.json();

  try {
    // Llamamos a la API real con el token de la cookie
    const newBook = await apiClient<Book>('/books', {
      method: 'POST',
      body: bookData,
    }, token); // <-- Pasamos el token aquí
    
    return json(newBook, { status: 201 });
  } catch (error: any) {
    return json({ message: error.message }, { status: 400 });
  }
};