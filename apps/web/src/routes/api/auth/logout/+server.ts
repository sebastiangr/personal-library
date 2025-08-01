import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
  // Borra la cookie
  cookies.delete('authToken', { path: '/' });
  return json({ success: true });
};