<!-- +page.svelte -->
<script lang="ts">
  import type { PageData } from './$types';
  import type { Book } from '$lib/types';

  export let data: PageData;
  
  const book = data.book as Book;
</script>

<div class="p-8">
  <!-- <h1 class="text-4xl font-bold">{book.title}</h1>
  <h2 class="text-xl text-gray-600 mb-4">{book.subtitle}</h2> -->
  <!-- ... Muestra más detalles del libro ... -->
  {#if book}
    <h1 class="text-4xl font-bold">{book.title}</h1>
    <h2 class="text-xl text-gray-600 mb-4">{book.subtitle ?? 'Sin subtítulo'}</h2>
    <p class="text-lg text-gray-600 mb-8">{book.description}</p>
    <div class="flex flex-wrap justify-left mb-8">
      {#if book.authors}
        {#each book.authors as author }
          <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">{author.name}</span>
        {/each}
      {:else}
        <span class="text-gray-500">Autor desconocido</span>
      {/if}
    </div>
    <p>Año de publicación: {book.published_year ?? 'No especificado'}</p>
    <p>ISBN_13: {book.isbn_13 ?? 'No especificado'}</p>
    <p>ISBN_10: {book.isbn_10 ?? 'No especificado'}</p>
    
    <!-- <p>Géneros: {book.genres?.length > 0 ? book.genres.join(', ') : 'No especificado'}</p> -->
    <p>Editorial: {book.publisher ?? 'No especificado'}</p>
    <p>Idioma: {book.language ?? 'No especificado'}</p>
    <p>Fecha de adición: {new Date(book.created_at).toLocaleDateString()}</p>
    <!-- ... Muestra más detalles del libro ... -->
  {:else}
    <p class="text-red-500">No se pudo cargar la información del libro.</p>
  {/if}
</div>