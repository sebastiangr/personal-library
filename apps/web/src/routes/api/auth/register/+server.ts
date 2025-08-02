import { json } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();

  // Llama a tu backend real para registrar al usuario
  const apiResponse = await fetch(`${PUBLIC_API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  // Si la API del backend devuelve un error (ej. email ya existe),
  // reenvía esa misma respuesta de error al frontend.
  if (!apiResponse.ok) {
    return new Response(apiResponse.body, {
        status: apiResponse.status,
        statusText: apiResponse.statusText
    });
  }

  const newUser = await apiResponse.json();
  
  // Devuelve los datos del nuevo usuario (sin loguearlo)
  return json(newUser, { status: 201 });
};