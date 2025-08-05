import { apiClient } from '$lib/api';
import type { Book } from '$lib/types';
import type { PageServerLoad } from './$types';

// La función `load` se ejecuta en el servidor antes de renderizar la página.
export const load: PageServerLoad = async ({ cookies }) => {
  const token = cookies.get('token');
  console.log('Token from dashboard>page.server.ts: ', token);

  // Si no hay token, no hay nada que hacer. El layout ya debería redirigir,
  // pero esta es una comprobación extra.
  if (!token) {
    return { books: [] };
  }
  
  try {
    // Pasamos el token como tercer argumento a nuestro apiClient.
    const books = await apiClient<Book[]>('/books', {}, token);
    return { books };
  } catch (error) {
    console.error("Error fetching books in dashboard:", error);
    return { books: [] };
  }
};