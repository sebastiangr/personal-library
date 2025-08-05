import { apiClient } from '$lib/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, cookies }) => {
  const token = cookies.get('token');
  const bookId = params.id;

  if (!token) {
    return { book: null };
  }

  try {
    const book = await apiClient(`/books/${bookId}`, {}, token);
    return { book };
  } catch (error) {
    console.error("Error fetching individual book:", error);
    return { book: null };
  }
};