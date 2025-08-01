<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
  import { authStore } from '$lib/stores/auth.svelte';
  import type { LayoutData } from './$types';
  
  let { data, children } = $props<{ data: LayoutData }>();
  // let { data } = $props<{ data: LayoutData }>();

  // Sincroniza el store del cliente con los datos que vienen del servidor
  $effect(() => {
    authStore.set(data.session);
  });
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}

