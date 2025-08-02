<script lang="ts">
  import { goto } from '$app/navigation';

  let name = $state('');
  let email = $state('');
  let password = $state('');
  let error = $state<string | null>(null);
  let successMessage = $state<string | null>(null);
  let isLoading = $state(false);

  async function handleRegister() {
    error = null;
    successMessage = null;
    isLoading = true;
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en el registro');
      }

      successMessage = "¡Registro exitoso! Por favor, inicia sesión.";
      setTimeout(() => goto('/login'), 2000); // Redirige al login después de 2 seg

    } catch (e: any) {
      error = e.message;
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100">
  <div class="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
    <h1 class="text-2xl font-bold mb-6 text-center">Crear Cuenta</h1>
    <form onsubmit={handleRegister}>
      <!-- Campo para el Nombre -->
      <div class="mb-4">
        <label for="name" class="block text-gray-700 mb-2">Nombre</label>
        <input type="text" id="name" bind:value={name} class="w-full px-3 py-2 border rounded-lg" required />
      </div>
      <!-- Campo para el Email -->
      <div class="mb-4">
        <label for="email" class="block text-gray-700 mb-2">Email</label>
        <input type="email" id="email" bind:value={email} class="w-full px-3 py-2 border rounded-lg" required />
      </div>
      <!-- Campo para la Contraseña -->
      <div class="mb-6">
        <label for="password" class="block text-gray-700 mb-2">Contraseña</label>
        <input type="password" id="password" bind:value={password} class="w-full px-3 py-2 border rounded-lg" required />
      </div>

      {#if error}
        <p class="text-red-500 text-sm mb-4 text-center">{error}</p>
      {/if}
      {#if successMessage}
        <p class="text-green-500 text-sm mb-4 text-center">{successMessage}</p>
      {/if}

      <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-lg" disabled={isLoading}>
        {isLoading ? 'Registrando...' : 'Crear Cuenta'}
      </button>
    </form>
    <p class="text-center mt-4">
      ¿Ya tienes una cuenta? <a href="/login" class="text-blue-600 hover:underline">Inicia sesión</a>
    </p>
  </div>
</div>