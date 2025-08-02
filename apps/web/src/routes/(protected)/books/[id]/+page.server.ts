import { apiClient } from '$lib/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, cookies }) => {
  // Eliminado: obtención de token desde cookies, ahora lo maneja Express backend
  const bookId = params.id;
  
  // const book = await apiClient(`/books/${bookId}`, {
  //     // El apiClient necesita el token, pero no podemos pasarlo desde el servidor
  //     // directamente. Una mejor solución sería tener una instancia de apiClient
  //     // para el servidor que pueda recibir el token.
  //     // Por ahora, asumiremos que apiClient puede funcionar si le pasamos el token.
  //     // Tendremos que refactorizar apiClient para esto.
  // });
  const book = await apiClient(`/books/${bookId}`);
  return { book };
};