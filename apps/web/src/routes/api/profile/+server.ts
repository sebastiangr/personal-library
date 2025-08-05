import { json } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
  // Eliminado: obtención de token desde cookies, ahora lo maneja Express backend
  // if (!token) {
  //   return json({ message: 'No autorizado' }, { status: 401 });
  // }

  const token = cookies.get('token');
  console.log('Token from cookies:', token);

  if (!token) {
    // Si no hay token, no se puede acceder al perfil
    return json({ message: 'No autorizado, falta el cookie de sesión' }, { status: 401 });
  }

  // Llama al backend real para obtener el perfil
  const apiResponse = await fetch(`${PUBLIC_API_URL}/profile`, {
    method: 'GET',    
    // credentials: 'include'
    headers: {
      'Authorization': `Bearer ${token}` // Asegúrate de enviar el token en el header 
    }
  });
  console.log('Profile API Response:', apiResponse);

  if (!apiResponse.ok) {
    console.error('Error de la API de backend al obtener el perfil:', apiResponse.statusText);
    return json({ message: 'No se pudo obtener el perfil de usuario' }, { status: apiResponse.status });
  }

  const user = await apiResponse.json();
  console.log('User API Profile:', user);
  return json(user);
};
