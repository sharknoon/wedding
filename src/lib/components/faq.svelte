<script lang="ts">
	import type { Details } from '$lib/types';
	export let details: Details;
</script>

<div id="faqs" class="min-h-screen snap-start">
	<h1 class="pt-6 pb-4 text-center font-display text-6xl">Häufige Fragen</h1>
	<div class="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#each details?.faqs || [] as faq}
			<div class="min-w-0 divide-y-2 divide-red-600 border-4 border-black p-2">
				<h3 class="mb-2 break-words text-center font-heading text-3xl">
					{faq.question}
				</h3>
				<div>
					{#each faq.answer as line}
						<p class="text-center font-body text-xl">{line}</p>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
