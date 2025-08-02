import { json } from '@sveltejs/kit';
import { apiClient } from '$lib/api';
import type { Genre } from '$lib/types';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
  // Eliminado: obtención de token desde cookies, ahora lo maneja Express backend
  
  try {
    const genres = await apiClient<Genre[]>('/genres');
    return json(genres);
  } catch (error: any) {
    return json({ message: error.message }, { status: 500 });
  }
};