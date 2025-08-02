<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<div class="p-8">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold">Autores</h1>
    <!-- Aquí irá el botón de "Añadir Autor" en el futuro -->
  </div>

  {#if data.authors && data.authors.length > 0}
    <div class="bg-white shadow-md rounded-lg">
      <ul class="divide-y divide-gray-200">
        {#each data.authors as author (author.id)}
          <li class="p-4 hover:bg-gray-50 flex justify-between items-center">
            <span class="font-medium text-gray-800">{author.name}</span>
            <!-- Aquí irán los botones de "Editar" o "Ver" -->
          </li>
        {/each}
      </ul>
    </div>
  {:else}
    <p class="text-gray-500">No se encontraron autores.</p>
  {/if}
</div>