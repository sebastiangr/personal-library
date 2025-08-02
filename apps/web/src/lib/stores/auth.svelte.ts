import type { Session, User } from '$lib/types';


function createAuthStore() {
  let session = $state<{ user: User | null }>({
    user: null
  });


  function set(newSession: { user: User | null }) {
    session = newSession;
  }

  // Logout function clears cookies

  async function logout() {
    session = { user: null };
    // TODO: Clear cookies in the backend
    await fetch('/api/auth/logout', { method: 'POST' });
  }


  return {
    get session() {
      return session;
    },
    set,
    logout,
  };
}

export const authStore = createAuthStore();



// import { browser } from '$app/environment';

// let user = $state<{ id: string; email: string } | null>(null);
// let token = $state<string | null>(null);

// // Al iniciar la app en el navegador, intenta cargar los datos de sesión
// if (browser) {
//   // Eliminado: manejo de authToken en localStorage
// }

// // Objeto exportado con el estado y las funciones para manipularlo
// export const authStore = {
//   get user() { return user; },
//   get token() { return token; },
  
//   login: (userData: { id: string, email: string }) => {
//     user = userData;
//     token = null;
//   },
  
//   logout: () => {
//     user = null;
//     token = null;
//   }
// };