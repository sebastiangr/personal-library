// apps/web/src/lib/api/index.ts
import { PUBLIC_API_URL } from '$env/static/public';

type ApiClientOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Record<string, any>;
  headers?: Record<string, string>;
  needsAuth?: boolean;
};

export async function apiClient<T>( 
    endpoint: string, 
    options: ApiClientOptions = {},
    serverToken?: string
  ): Promise<T> {

  const { method = 'GET', body, headers = {}, needsAuth = true } = options;

  const finalHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers
  };
  
  
  if (needsAuth) {
    const token = serverToken;
    console.log('Token from API:index.ts: ', token);
    
    if (token) {
      finalHeaders['Authorization'] = `Bearer ${token}`;
    } else {
      // Este es el error que probablemente estás viendo en la consola
      console.warn(`Petición a ${endpoint} requiere autenticación pero no se encontró token.`);
      throw new Error('Authentication token is missing.');
    }
  }
  
  // No enviar Authorization por defecto, confiar en cookie httpOnly

  console.log(`Llamada a la API: ${method} ${PUBLIC_API_URL}${endpoint}`, {
    headers: finalHeaders,
    body
  });

  const response = await fetch(`${PUBLIC_API_URL}${endpoint}`, {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : null
  });

  console.log(`Respuesta de la API: ${response.status} ${response.statusText}`);

  if (!response.ok) {
    // Manejo de errores de la API
    const errorData = await response.json();
    throw new Error(errorData.message || 'Ocurrió un error en la API');
  }

  // Si la respuesta no tiene contenido (ej. DELETE 204), devuelve un objeto vacío
  if (response.status === 204) {
    return {} as T;
  }
  
  console.log(`Respuesta de la API para ${endpoint}:`, response);
  return response.json() as T;
}