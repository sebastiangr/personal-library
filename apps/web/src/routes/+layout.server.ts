import type { LayoutServerLoad } from './$types';

// Esta función se ejecuta para CADA petición al servidor.
export const load: LayoutServerLoad = async ({ cookies }) => {
  const token = cookies.get('authToken');

  if (!token) {
    return { session: { user: null, token: null } };
  }
  
  // Aquí podrías verificar el token si quisieras
  const userPayload = JSON.parse(atob(token.split('.')[1])).user;
  
  return {
    session: {
      user: userPayload,
      token: token
    }
  };
};