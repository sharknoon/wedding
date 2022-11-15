<script lang="ts">
	import { downloadNodesAsPng } from '$lib/client/download';

	export let downloadables: HTMLElement[];
	export let scale = 8;
</script>

<button on:click={() => downloadNodesAsPng(downloadables, scale)} class="fixed right-4 top-4">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-8 w-8"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		stroke-width="2"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
		/>
	</svg>
</button>
