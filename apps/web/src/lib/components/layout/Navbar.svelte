<!-- apps/web/src/lib/components/layout/Navbar.svelte -->
<script lang="ts">
  import { authStore } from "$lib/stores/auth.svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  async function handleLogout() {
    // Llama a la función de logout del store
    await authStore.logout();
    // Redirige al login
    goto('/login');
  }
</script>

<nav class="bg-white shadow-md">
  <div class="container mx-auto px-6 py-3 flex justify-between items-center">
    <a href="/" class="text-xl font-bold text-gray-800">Mi Biblioteca</a>
    
    <div>
      {#if authStore.session.user}
        <div class="flex items-center">
          <a href="/dashboard" class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded">Biblioteca</a>
          <a href="/authors" class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded">Autores</a>
          <a href="/genres" class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded">Géneros</a>
          <a href="/publishers" class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded">Editoriales</a>
          <span class="text-gray-500 mx-4">|</span>
          <span class="text-gray-700 mr-4">Hola, {authStore.session.user.name || authStore.session.user.email}</span>
          <button on:click={handleLogout} class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Cerrar Sesión
          </button>
        </div>
      {:else}
        <div>
          {#if $page.url.pathname !== '/login'}
            <a href="/login" class="text-gray-800 hover:text-blue-600 mr-4">Login</a>
          {/if}
          {#if $page.url.pathname !== '/register'}
            <a href="/register" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Registrarse</a>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</nav>