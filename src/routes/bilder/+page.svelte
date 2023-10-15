<script lang="ts">
	import { onMount } from 'svelte';
	import lightGallery from 'lightgallery';
	import 'lightgallery/css/lightgallery-bundle.css';
	import lgThumbnail from 'lightgallery/plugins/thumbnail';
	import lgZoom from 'lightgallery/plugins/zoom';
	import lgVideo from 'lightgallery/plugins/video';
	import lgAutoplay from 'lightgallery/plugins/autoplay';
	import lgFullscreen from 'lightgallery/plugins/fullscreen';

	let gallery: HTMLDivElement;

	onMount(() => {
		lightGallery(gallery, {
			plugins: [lgZoom, lgThumbnail, lgVideo, lgAutoplay, lgFullscreen]
		});
	});
</script>

<div class="mt-24 flex flex-col gap-4 p-2 text-center md:mt-48">
	<h1 class="font-cheap-pine text-8xl">Danke<span class="text-red-600">!</span></h1>
	<h2 class="font-cheap-pine-sans text-4xl">dass ihr dabei wart</h2>

	<div class="font-oswald text-xl">
		<p>Ihr habt dazu beigetragen, dass dieser Tag für uns unvergesslich bleiben wird.</p>
		<p>
			Für die Hilfe und Unterstützung, die vielen Ideen und tollen Überraschungen, die zahlreichen
			Glückwünsche und Geschenke bedanken wir uns von ganzem Herzen.
		</p>
		<p>Unser Tag war wunderbar!</p>
	</div>

	<button
		on:click={() => {}}
		class="flex gap-2 self-center border-0 bg-red-600 px-4 py-2 font-oswald text-xl text-white ring-black ring-offset-2 ring-offset-white transition hover:bg-red-700 hover:text-white focus:ring-2"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="h-6 w-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
			/>
		</svg>
		Bilder herunterladen
	</button>
</div>

<div class="mt-8 flex items-center justify-center gap-2 p-2" bind:this={gallery}>
	<!-- data-lg-size="${width}-${height}" -->
	<a
		href="https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1600&q=80"
		data-sub-html="<div></div>"
	>
		<img
			alt="wedding"
			class="img-fluid"
			src="https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=240&q=80"
		/>
	</a>
</div>
