<!-- apps/web/src/routes/(protected)/books/new/+page.svelte -->
<script lang="ts">
  import { goto } from '$app/navigation';
  import { apiClient } from '$lib/api';
  import type { Book } from '$lib/types';
  import BookForm from '$lib/components/books/BookForm.svelte';
	import { authStore } from '$lib/stores/auth.svelte';

  let isLoading = $state(false);
  let error = $state<string | null>(null);

  async function handleCreateBook(bookData: Partial<Book>) {
    
    console.log('Handling book creation with data:', bookData);
    isLoading = true;
    error = null;

    try {
      console.log('Attempting to create book with data:', bookData);

      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData)
      });
        
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el libro');
      }
        
      const newBook: Book = await response.json();
      console.log('Book created successfully:', newBook);
      goto(`/books/${newBook.id}`);
    } catch (e: any) {
      // Aquí mostramos los errores de validación de Zod del backend
      console.error(e);
      error = e.message;
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="p-8 max-w-4xl mx-auto">
  <h1 class="text-3xl font-bold mb-6">Añadir Nuevo Libro</h1>

  {#if error}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
      <strong class="font-bold">¡Error!</strong>
      <span class="block sm:inline">{error}</span>
    </div>
  {/if}

  <div class="bg-white p-6 rounded-lg shadow-md">
    <!-- <BookForm onsubmit={(e) => handleCreateBook(e.detail)} {isLoading} /> -->
    <BookForm onsubmit={handleCreateBook} {isLoading} />
  </div>
</div>