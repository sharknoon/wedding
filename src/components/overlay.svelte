<script lang="ts">
	export let loading: boolean;
	export let error: string;
</script>

<div
	class="fixed top-0 right-0 bottom-0 left-0 backdrop-filter backdrop-blur-xl backdrop-brightness-50 flex items-center justify-center"
>
	<div class="flex items-center text-background p-12">
		{#if loading}
			<svg
				class="animate-spin h-10 w-10"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle class="opacity-75" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
				<path
					class="text-red-600"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				/>
			</svg>
			<span class="ml-4 text-4xl font-display">Laden</span>
		{:else}
			<span class="text-3xl">{error}</span>
		{/if}
	</div>
</div>
