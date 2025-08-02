<!-- apps/web/src/lib/components/books/BookForm.svelte -->
<script lang="ts">
  import type { Book } from '$lib/types';

  // --- Props y Estado ---
  // El 'book' inicial. Puede ser un objeto vacío para 'crear'
  // o un libro existente para 'editar'.
  let { book = {} as Partial<Book>, isLoading = false, onsubmit: handleSubmitEvent } = $props<{
    book?: Partial<Book>;
    isLoading?: boolean;
    onsubmit?: (bookData: Partial<Book>) => void;
  }>();

  // Creamos estados locales para cada campo del formulario,
  // inicializados con los valores del prop 'book'.
  let title = $state(book.title || '');
  let subtitle = $state(book.subtitle || '');
  let published_year = $state(book.published_year || undefined);
  let page_count = $state(book.page_count || undefined);
  // ... puedes añadir más campos aquí (isbn, description, etc.)

  // --- Eventos ---
  function triggerSubmit() {
    if (handleSubmitEvent) {
      console.log('Triggering submit with data:', {
        title,
        subtitle,
        published_year,
        page_count
      });
      const bookData: Partial<Book> = {
        title,
        subtitle,
        published_year: published_year ? Number(published_year) : undefined,
        page_count: page_count ? Number(page_count) : undefined,
      };
      console.log('Book data to submit:', bookData);
      handleSubmitEvent(bookData);
    }
  }
</script>

<form onsubmit={triggerSubmit} class="space-y-6">
  <div>
    <label for="title" class="block text-sm font-medium text-gray-700">Título</label>
    <input type="text" id="title" bind:value={title} required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
  </div>

  <div>
    <label for="subtitle" class="block text-sm font-medium text-gray-700">Subtítulo</label>
    <input type="text" id="subtitle" bind:value={subtitle} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
  </div>
  
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
    <div>
      <label for="published_year" class="block text-sm font-medium text-gray-700">Año de Publicación</label>
      <input type="number" id="published_year" bind:value={published_year} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
    </div>
    <div>
      <label for="page_count" class="block text-sm font-medium text-gray-700">Número de Páginas</label>
      <input type="number" id="page_count" bind:value={page_count} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
    </div>
  </div>
  
  <!-- Aquí irían los selects para autores, géneros, etc. en el futuro -->

  <div class="pt-4">
    <button 
      type="submit" 
      disabled={isLoading}
      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
    >
      {isLoading ? 'Guardando...' : 'Guardar Cambios'}
    </button>
  </div>
</form>