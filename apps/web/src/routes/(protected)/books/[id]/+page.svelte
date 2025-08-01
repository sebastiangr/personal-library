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
    <p>Año de publicación: {book.published_year ?? 'No especificado'}</p>
    <!-- ... Muestra más detalles del libro ... -->
  {:else}
    <p class="text-red-500">No se pudo cargar la información del libro.</p>
  {/if}
</div>