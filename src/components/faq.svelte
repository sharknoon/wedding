<script lang="ts">
	import type { Wedding } from '../types';
	export let wedding: Wedding;
</script>

<div id="faqs" class="min-h-screen">
	<h1 class="text-center font-display text-6xl pt-6 pb-4">Häufige Fragen</h1>
	<div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
		{#each wedding?.details?.faqs || [] as faq}
			<div class="border-2 border-red-600 rounded-xl bg-gray-100 p-4 md:p-8">
				<h3 class="text-center font-body text-2xl mb-2 text-gray-900">{faq.question}</h3>
				{#each faq.answer as line}
					<p class="font-semibold font-body text-gray-900">{line}</p>
				{/each}
			</div>
		{/each}
	</div>
</div>
