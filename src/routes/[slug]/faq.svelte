<script lang="ts">
	import { details } from '$lib/client/stores';
</script>

<div class="min-h-full w-full pb-12 md:pb-14">
	<h1 class="pb-4 pt-6 text-center font-cheap-pine text-6xl">Häufige Fragen</h1>
	<div class="text-center font-oswald text-xl">
		<p>Bei weiteren Fragen meldet euch bei unserer Hochzeitsplanerin Jessica Schhömer</p>
		<p>
			E-Mailadresse: <a href="mailto:info@amabelle-hochzeiten.de" class="hover:underline">
				info@amabelle-hochzeiten.de
			</a>
		</p>
		<p>Telefon: <a href="tel:+4917623352354" class="hover:underline">0176/23352354</a></p>
	</div>
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
