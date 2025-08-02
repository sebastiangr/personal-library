import { json } from '@sveltejs/kit';
import { apiClient } from '$lib/api';
import type { Author } from '$lib/types';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
  const token = cookies.get('authToken');
  
  try {
    const authors = await apiClient<Author[]>('/authors', {}, token);
    return json(authors);
  } catch (error: any) {
    return json({ message: error.message }, { status: 500 });
  }
};