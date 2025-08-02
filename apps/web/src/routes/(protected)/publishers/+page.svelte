<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<div class="p-8">
  <h1 class="text-3xl font-bold mb-6">Editoriales</h1>
  
  {#if data.publishers && data.publishers.length > 0}
    <div class="bg-white shadow-md rounded-lg">
      <ul class="divide-y divide-gray-200">
        {#each data.publishers as publisher (publisher.id)}
          <li class="p-4 hover:bg-gray-50">
            <span class="font-medium text-gray-800">{publisher.name}</span>
          </li>
        {/each}
      </ul>
    </div>
  {:else}
    <p class="text-gray-500">No se encontraron editoriales.</p>
  {/if}
</div>