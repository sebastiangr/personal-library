<!-- apps/web/src/routes/(protected)/dashboard/+page.svelte -->
<script lang="ts">
  import { authStore } from '$lib/stores/auth.svelte';
  import { apiClient } from '$lib/api';
  import type { Book } from '$lib/types';

  let books = $state<Book[]>([]);
  let isLoading = $state(true);

  // $effect es un Rune que se ejecuta cuando el componente se monta
  // y cada vez que sus dependencias cambian.
  $effect(() => {
    async function fetchBooks() {
      try {
        const fetchedBooks = await apiClient<Book[]>('/books');
        books = fetchedBooks;
      } catch (error) {
        console.error("Error al obtener los libros:", error);
      } finally {
        isLoading = false;
      }
    }

    fetchBooks();
  });
</script>

<div class="p-8">
  <h1 class="text-3xl font-bold mb-6">Mi Biblioteca</h1>
  
  {#if authStore.session.user}
    <p class="mb-4">Bienvenido, {authStore.session.user.email}!</p>
  {/if}

  {#if isLoading}
    <p>Cargando libros...</p>
  {:else if books.length === 0}
    <p>No tienes libros en tu biblioteca. ¡Añade el primero!</p>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each books as book (book.id)}
        <div class="border p-4 rounded-lg shadow">
          <h2 class="font-bold text-lg">{book.title}</h2>
          <p class="text-gray-600">{book.published_year}</p>
        </div>
      {/each}
    </div>
  {/if}
</div>