import { json } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
  const { email, password } = await request.json();

  // Llama a tu backend real
  const apiResponse = await fetch(`${PUBLIC_API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!apiResponse.ok) {
    return apiResponse; // Reenvía la respuesta de error
  }

  const { token, user } = await apiResponse.json();

  // ¡LA CLAVE! Guarda el token en una cookie httpOnly, segura.
  cookies.set('authToken', token, {
    path: '/',
    httpOnly: true, // El navegador no puede acceder a ella con JS
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production', // Solo en HTTPS en producción
    maxAge: 60 * 60 * 24 // 1 día
  });

  // Devuelve los datos del usuario al cliente
  return json({ user });
};