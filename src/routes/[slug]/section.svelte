<script lang="ts">
	export let name: string;
	export let scrollTo: string | undefined = undefined;
	export let color = 'text-gray-800';

	function scrollDown() {
		const element = document.querySelector('#' + scrollTo);
		if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
</script>

<div id={name} class="relative flex min-h-full snap-start">
	<slot />
	{#if scrollTo}
		<div class="absolute bottom-1 flex w-full justify-center">
			<button on:click={scrollDown} class={color} aria-label="go down to the next section">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					class="h-12 w-12 animate-bounce"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
				</svg>
			</button>
		</div>
	{/if}
</div>
