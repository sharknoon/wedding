<script lang="ts">
	import { details } from '$lib/client/stores';
</script>

<div id="faqs" class="min-h-full snap-start md:pb-14">
	<h1 class="pt-6 pb-4 text-center font-cheap-pine text-6xl">Häufige Fragen</h1>
	<div class="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
		{#each $details?.faqs || [] as faq}
			<div class="min-w-0 border-4 border-black p-2">
				<h2 class="mb-2 break-words text-center font-cheap-pine-sans text-3xl">
					{faq.question}
				</h2>
				<hr class="border-2 border-t-red-600" />
				<div class="mt-2">
					{#each faq.answer as line}
						<p class="text-center font-oswald text-xl">{line}</p>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
