import type { Session, User } from '$lib/types';

function createAuthStore() {
  let session = $state<Session>({
    user: null,
    token: null,
  });

  function set(newSession: Session) {
    session = newSession;
  }

  // Logout function clears cookies
  async function logout() {
    session = { user: null, token: null };
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
//   const storedToken = localStorage.getItem('authToken');
//   const storedUser = localStorage.getItem('user');
//   if (storedToken && storedUser) {
//     token = storedToken;
//     user = JSON.parse(storedUser);
//   }
// }

// // Objeto exportado con el estado y las funciones para manipularlo
// export const authStore = {
//   get user() { return user; },
//   get token() { return token; },
  
//   login: (userData: { id: string, email: string }, authToken: string) => {
//     user = userData;
//     token = authToken;
//     if (browser) {
//       localStorage.setItem('authToken', authToken);
//       localStorage.setItem('user', JSON.stringify(userData));
//     }
//   },
  
//   logout: () => {
//     user = null;
//     token = null;
//     if (browser) {
//       localStorage.removeItem('authToken');
//       localStorage.removeItem('user');
//     }
//   }
// };