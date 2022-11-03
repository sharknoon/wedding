<script lang="ts">
	import { details } from '$lib/client/stores';

	$: date = new Date($details?.date);

	function scrollDown() {
		const element = document.querySelector('#info');
		if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
</script>

<div id="home" class="flex min-h-full snap-start flex-col items-center justify-between p-6">
	<div class="flex grow flex-col items-center lg:flex-row lg:justify-center lg:gap-12 xl:gap-48">
		<div
			class="grid aspect-square w-[15rem] grid-cols-2 grid-rows-1 md:w-[20rem] lg:w-[22.5rem] xl:w-[25rem] 2xl:w-[30rem]"
		>
			<div
				class="group relative col-start-1 row-start-1 flex items-end justify-center overflow-hidden transition"
			>
				<picture>
					<source srcset="/images/people/midrene-and-josua.avif" type="image/avif" />
					<source srcset="/images/people/midrene-and-josua.webp" type="image/webp" />
					<img
						class="absolute inset-0 h-full w-full object-cover"
						src="/images/people/midrene-and-josua.png"
						alt="couple"
					/>
				</picture>
				<div
					class="mb-2 flex translate-y-12 flex-col items-center opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100"
				>
					<span class="font-cheap-pine-sans text-3xl text-white">Reichenbach an der Fils</span>
					<span class="bg-black px-2 font-cheap-pine-sans text-2xl text-white">Oktober 2022</span>
				</div>
			</div>
			<div class="col-start-2 row-start-1 flex flex-col">
				<div class="group flex flex-1 items-end justify-center">
					<div
						class="text-center font-cheap-pine-sans text-3xl uppercase tracking-widest transition group-hover:-translate-y-0.5 group-hover:scale-110 lg:text-4xl"
					>
						B l a c k
					</div>
				</div>
				<div class="group flex-1 bg-black">
					<div
						class="text-center font-cheap-pine-sans text-3xl uppercase tracking-widest text-white transition group-hover:translate-y-0.5 group-hover:scale-110 lg:text-4xl"
					>
						W h i t e
					</div>
				</div>
			</div>
		</div>

		<div
			class="flex aspect-square max-w-full grow flex-col justify-center sm:gap-4 lg:grow-0 lg:gap-8"
		>
			<div
				class="text-center font-cheap-pine text-4xl uppercase transition hover:-rotate-3 hover:drop-shadow-2xl lg:text-8xl"
			>
				Die Hochzeit
			</div>
			<div class="group pt-3 text-center font-cheap-pine-sans text-3xl uppercase md:text-4xl">
				von <div class="inline-block text-red-600 transition group-hover:translate-x-[7.5rem]">
					Midrène
				</div>
				&
				<div class="inline-block text-red-600 transition group-hover:-translate-x-28">Josua</div>
			</div>
			<div class="group pb-1 text-center font-oswald text-lg lg:text-xl">
				Gesucht und Gefunden, in <span class="transition group-hover:text-red-600">Liebe</span> verbunden
			</div>
			<div class="group flex items-center gap-8">
				<div class="grow border-t-2 border-black transition group-hover:-translate-x-2" />
				<!-- old heroicons 1 icon -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-10 w-10 transition group-hover:scale-110"
					viewBox="0 0 20 20"
					fill="rgb(220,38,38)"
				>
					<path
						fill-rule="evenodd"
						d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
						clip-rule="evenodd"
					/>
				</svg>
				<div class="grow border-t-2 border-black transition group-hover:translate-x-2" />
			</div>
			<div class="group text-center font-cheap-pine-sans text-3xl leading-none md:text-4xl">
				<span class="transition group-hover:text-red-600">
					{date.toLocaleDateString(undefined, {
						day: '2-digit'
					})}</span
				>. {date.toLocaleDateString('de-DE', {
					month: 'long'
				})}
				20<span class="transition group-hover:text-red-600"
					>{date.toLocaleDateString('de-DE', {
						year: '2-digit'
					})}</span
				>
			</div>
		</div>
	</div>
	<button on:click={scrollDown} class="text-gray-800" aria-label="go down to the next section">
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
