import { json } from '@sveltejs/kit';
import { apiClient } from '$lib/api';
import type { Genre } from '$lib/types';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
  const token = cookies.get('authToken');
  
  try {
    const genres = await apiClient<Genre[]>('/genres', {}, token);
    return json(genres);
  } catch (error: any) {
    return json({ message: error.message }, { status: 500 });
  }
};