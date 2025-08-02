import { json } from '@sveltejs/kit';
import { apiClient } from '$lib/api';
import type { Publisher } from '$lib/types';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
  // Eliminado: obtención de token desde cookies, ahora lo maneja Express backend
  
  try {
    const publishers = await apiClient<Publisher[]>('/publishers');
    return json(publishers);
  } catch (error: any) {
    return json({ message: error.message }, { status: 500 });
  }
};