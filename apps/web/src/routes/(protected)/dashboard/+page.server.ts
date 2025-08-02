import { apiClient } from '$lib/api';
import type { Book } from '$lib/types';
import type { PageServerLoad } from './$types';

// La función `load` se ejecuta en el servidor antes de renderizar la página.
export const load: PageServerLoad = async ({ cookies }) => {
  // 1. Obtenemos el token de la cookie segura.
  const token = cookies.get('authToken');
  
  try {
    // 2. Llamamos a nuestra API del backend para obtener los libros.
    const books = await apiClient<Book[]>('/books', {}, token);
    
    // 3. Devolvemos los libros para que la página los pueda usar.
    return { books };
  } catch (error) {
    console.error("Error fetching books in dashboard:", error);
    // Si hay un error (ej. token inválido), devolvemos un array vacío.
    return { books: [] };
  }
};