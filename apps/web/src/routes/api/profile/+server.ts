import { json } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
  // Eliminado: obtención de token desde cookies, ahora lo maneja Express backend
  // if (!token) {
  //   return json({ message: 'No autorizado' }, { status: 401 });
  // }

  // Llama al backend real para obtener el perfil
  const apiResponse = await fetch(`${PUBLIC_API_URL}/profile`, {
    method: 'GET',    
    credentials: 'include'
  });
  console.log('Profile API Response:', apiResponse);

  if (!apiResponse.ok) {
    return json({ message: 'No se pudo obtener el perfil de usuario' }, { status: apiResponse.status });
  }

  const user = await apiResponse.json();
  console.log('User API Profile:', user);
  return json(user);
};
