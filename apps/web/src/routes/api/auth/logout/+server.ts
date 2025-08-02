import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async () => {
  // Llama al backend para cerrar sesión y borrar la cookie httpOnly
  const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3003'}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include'
  });
  if (!res.ok) {
    return json({ success: false }, { status: 500 });
  }
  return json({ success: true });
};