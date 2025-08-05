import { apiClient } from '$lib/api';
import type { Genre } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
  const token = cookies.get('token');
  console.log('Token from authors>page.server.ts: ', token);

  if (!token) {
    return { genres: [] };
  }

  try {
    const genres = await apiClient<Genre[]>('/genres', {}, token);
    return { genres };  
  } catch (error) {
    console.error("Error fetching genres:", error);
    return { genres: [] };
  }
};