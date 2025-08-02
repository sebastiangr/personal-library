import { json } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';
import type { RequestHandler } from './$types';

// export const POST: RequestHandler = async ({ request, cookies }) => {
//   const { email, password } = await request.json();

//   // Llama a tu backend real
//   const apiResponse = await fetch(`${PUBLIC_API_URL}/auth/login`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ email, password }),
//     credentials: 'include' // Asegúrate de enviar las cookies
//   });

//   if (!apiResponse.ok) {
//     return apiResponse; // Reenvía la respuesta de error
//   }

//   const { token } = await apiResponse.json();
//   // Guarda el token en una cookie httpOnly, segura.
//   cookies.set('token', token, {
//     path: '/',
//     httpOnly: true,
//     sameSite: 'strict',
//     secure: process.env.NODE_ENV === 'production',
//     maxAge: 60 * 60 * 24
//   });
//   // No devuelvas el token al frontend, solo éxito
//   return json({ success: true });
// };

export const POST: RequestHandler = async ({ request }) => {
  const { email, password } = await request.json();
  const apiResponse = await fetch(`${PUBLIC_API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include'
  });
  return apiResponse;
};