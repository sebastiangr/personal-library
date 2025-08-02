import type { Author } from '$lib/types';
import type { PageServerLoad } from './$types';

// La función `load` se ejecuta en el servidor.
// `fetch` aquí es una versión especial proporcionada por SvelteKit
// que puede llamar a tus propios endpoints de API internos.
export const load: PageServerLoad = async ({ fetch }) => {
  try {
    const response = await fetch('/api/authors');
    if (!response.ok) {
        throw new Error('Failed to fetch authors');
    }
    const authors: Author[] = await response.json();
    return { authors };
  } catch (error) {
    console.error("Error fetching authors:", error);
    return { authors: [] };
  }
};