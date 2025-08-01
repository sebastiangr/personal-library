<script lang="ts">
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/auth.svelte';
  import { apiClient } from '$lib/api';
  import { invalidateAll } from '$app/navigation';

  // Estado local del formulario usando Runes
  let email = $state('');
  let password = $state('');
  let error = $state<string | null>(null);
  let isLoading = $state(false);

  async function handleLogin() {
    error = null;
    isLoading = true;

    try {

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al iniciar sesión');
      }

      await invalidateAll()
      goto('/dashboard');


      //2. Update UI and return, invalidateAll 

      // const { token } = await apiClient<{ token: string }>('/auth/login', {
      //   method: 'POST',
      //   body: { email, password },
      //   needsAuth: false // Esta ruta no necesita token
      // });
      
      // // Aquí deberíamos obtener los datos del usuario.
      // // Por ahora, asumimos que los tenemos o hacemos otra llamada.
      // // Una mejora sería que el endpoint de login devuelva el user y el token.
      // // Vamos a simularlo por ahora.
      // const userPayload = JSON.parse(atob(token.split('.')[1])).user;
      
      // authStore.login(userPayload, token);
      
      // // Redirige al dashboard después del login
      // goto('/dashboard');

    } catch (e: any) {
      error = e.message;
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100">
  <div class="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
    <h1 class="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>
    <form onsubmit={handleLogin}>
      <div class="mb-4">
        <label for="email" class="block text-gray-700 mb-2">Email</label>
        <input 
          type="email" 
          id="email" 
          bind:value={email}
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div class="mb-6">
        <label for="password" class="block text-gray-700 mb-2">Contraseña</label>
        <input 
          type="password" 
          id="password"
          bind:value={password}
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {#if error}
        <p class="text-red-500 text-sm mb-4">{error}</p>
      {/if}

      <button 
        type="submit" 
        class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        disabled={isLoading}
      >
        {isLoading ? 'Cargando...' : 'Entrar'}
      </button>
    </form>
  </div>
</div>