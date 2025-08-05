import { apiClient } from '$lib/api';
import type { Author } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
  const token = cookies.get('token');
  console.log('Token from authors>page.server.ts: ', token);

  if (!token) {
    return { authors: [] };
  }

  try {
    const authors = await apiClient<Author[]>('/authors', {}, token);
    return { authors };
  } catch (error) {
    console.error("Error fetching authors:", error);
    return { authors: [] };
  }
};