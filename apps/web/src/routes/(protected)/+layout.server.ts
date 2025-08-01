// apps/web/src/routes/(protected)/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ parent }) => {

  const { session } = await parent();

  if (!session.user) {
    // Si no hay usuario en la sesión, redirige al login
    throw redirect(303, '/login');
  }

  return {
    session
  };

  // SvelteKit no tiene acceso a localStorage en el servidor.
  // La forma correcta de manejar sesiones es con cookies.
  // Por ahora, simularemos esto, pero la forma correcta sería:
  // const token = cookies.get('authToken');

  // if (!token) {
  //   // Si no hay token en la cookie, redirige al login.
  //   throw redirect(303, '/login');
  // }
  
  // Si hay token, podrías verificarlo aquí contra la API
  // y devolver los datos del usuario a las páginas hijas.
  // Por ejemplo:
  // const user = await verifyTokenAndGetUser(token);
  // return { user };
};