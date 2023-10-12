<script lang="ts">
	import { env } from '$env/dynamic/public';
</script>

<svelte:head>
	{#if env.PUBLIC_TRACKING_SCRIPT}
		{@html decodeURIComponent(env.PUBLIC_TRACKING_SCRIPT)}
	{/if}
</svelte:head>
