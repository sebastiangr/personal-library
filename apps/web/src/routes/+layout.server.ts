import type { LayoutServerLoad } from './$types';

// Esta función se ejecuta para CADA petición al servidor.
export const load: LayoutServerLoad = async ({ fetch }) => {
  // Pide el perfil al backend, que valida la cookie httpOnly
  const res = await fetch('/api/profile', { credentials: 'include' });
  if (!res.ok) {
    return { session: { user: null, token: null } };
  }
  const user = await res.json();
  return {
    session: {
      user,
      token: null
    }
  };
};