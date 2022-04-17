<script lang="ts">
	export let status = '';
</script>

{#if status === 'pending'}
	<svg
		class="h-5 w-5 animate-spin"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
	>
		<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
		<path
			class="opacity-75"
			fill="currentColor"
			d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
		/>
	</svg>
{:else if status === 'success'}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-6 w-6 opacity-0 fadeOut"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
	>
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
	</svg>
{:else if status === 'error'}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-6 w-6"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M6 18L18 6M6 6l12 12"
		/>
	</svg>
{/if}

<style lang="postcss">
	.fadeOut {
		animation: fadeOut 4s cubic-bezier(0.4, 0, 0.6, 1);
	}

	@keyframes fadeOut {
		0%,
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>
