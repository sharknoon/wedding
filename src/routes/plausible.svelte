<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { page } from '$app/stores';
</script>

<svelte:head>
	{#if env.PUBLIC_PLAUSIBLE_URL}
		<script defer data-domain={$page.url.host} src={env.PUBLIC_PLAUSIBLE_URL + '/js/script.js'}>
		</script>
	{/if}
</svelte:head>
