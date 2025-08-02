<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<div class="p-8">
  <h1 class="text-3xl font-bold mb-6">Géneros</h1>
  
  {#if data.genres && data.genres.length > 0}
    <div class="flex flex-wrap gap-4">
      {#each data.genres as genre (genre.id)}
        <span class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-4 py-2 rounded-full mr-2">
          {genre.name}
        </span>
      {/each}
    </div>
  {:else}
    <p class="text-gray-500">No se encontraron géneros.</p>
  {/if}
</div>