<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { invalidateAll } from '$app/navigation';
	import { dev } from '$app/environment';
	import type { PageData } from './$types';
	import lightGallery from 'lightgallery';
	import type { LightGallery } from 'lightgallery/lightgallery';
	import 'lightgallery/css/lightgallery.css';
	// @ts-expect-error
	import lgThumbnail from 'lightgallery/plugins/thumbnail/lg-thumbnail.umd';
	import 'lightgallery/css/lg-thumbnail.css';
	// @ts-expect-error
	import lgZoom from 'lightgallery/plugins/zoom/lg-zoom.umd';
	import 'lightgallery/css/lg-zoom.css';
	// @ts-expect-error
	import lgVideo from 'lightgallery/plugins/video/lg-video.umd';
	import 'lightgallery/css/lg-video.css';
	// @ts-expect-error
	import lgAutoplay from 'lightgallery/plugins/autoplay/lg-autoplay.umd';
	import 'lightgallery/css/lg-autoplay.css';
	// @ts-expect-error
	import lgFullscreen from 'lightgallery/plugins/fullscreen/lg-fullscreen.umd';
	import 'lightgallery/css/lg-fullscreen.css';

	export let data: PageData;

	let uploadInput: HTMLInputElement;
	let galleryElement: HTMLDivElement;

	let showModal = false;
	let progress = 0;
	let gallery: LightGallery;

	onMount(() => {
		gallery = lightGallery(galleryElement, {
			plugins: [lgZoom, lgThumbnail, lgVideo, lgAutoplay, lgFullscreen],
			thumbnail: true,
			mobileSettings: {
				showCloseIcon: true,
				download: true,
				preload: 1
			}
		});
	});

	function upload() {
		progress = 0;
		var request = new XMLHttpRequest();
		request.upload.addEventListener('progress', (e) => (progress = e.loaded / e.total), false);
		request.addEventListener(
			'load',
			() =>
				invalidateAll().then(() => {
					showModal = false;
					gallery.refresh();
				}),
			false
		);
		request.addEventListener('error', () => console.error('Error during upload'), false);
		request.addEventListener('abort', () => console.log('Upload aborted'), false);
		request.open('POST', '?/upload', true);
		request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		const formdata = new FormData();
		for (let i = 0; i < (uploadInput.files?.length ?? 0); i++) {
			const file = uploadInput.files?.item(i);
			if (!file) continue;
			formdata.append('uploads', file);
		}
		showModal = true;
		request.send(formdata);
	}
</script>

<div class="mt-8 flex flex-col items-center gap-4 p-2 text-center md:mt-48">
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
		Aufnahmen herunterladen
	</button>

	<h2 class="mt-6 font-cheap-pine-sans text-4xl">Zeig uns deine Aufnahmen von der Hochzeit!</h2>

	<div class="font-oswald text-xl">
		<p>
			Lade bitte nur Bilder und Videos hoch, bei denen du dich wohlfühlst, wenn andere
			Hochzeitsgäste sie sehen.
		</p>

		<p>Deine Aufnahmen werden hier auf der Website für die anderen Hochzeitsgäste angezeigt.</p>
	</div>

	<form method="POST" action="?/upload" enctype="multipart/form-data">
		<input
			type="file"
			name="uploads"
			class="hidden"
			bind:this={uploadInput}
			multiple
			accept="image/*,video/*"
			on:change={upload}
		/>
		<button
			on:click={() => uploadInput.click()}
			type="button"
			class="flex gap-2 self-center border-0 bg-green-600 px-4 py-2 font-oswald text-xl text-white ring-black ring-offset-2 ring-offset-white transition hover:bg-green-700 hover:text-white focus:ring-2"
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
					d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
				/>
			</svg>
			Aufnahmen hochladen
		</button>
	</form>
</div>

<div class="container mx-auto my-8 flex flex-wrap gap-2" bind:this={galleryElement}>
	{#each data.images as { _id, url, type, width, height, thumbnailUrl, originalUrl }}
		{#if type.startsWith('image/')}
			<a
				href={url}
				data-sub-html="<div></div>"
				data-lg-size={`${width}-${height}`}
				data-download-url={originalUrl}
				class="max-h-[200px] max-w-[350px] flex-grow"
			>
				<img alt={_id.toString()} src={thumbnailUrl} class="h-full w-full object-cover" />
			</a>
		{:else if type.startsWith('video/')}
			<!-- svelte-ignore a11y-missing-attribute -->
			<a
				data-video={JSON.stringify({
					source: [
						{
							src: url,
							type
						}
					],
					attributes: { controls: true }
				})}
				data-sub-html="<div></div>"
			>
				<img alt="video" src={url} />
			</a>
		{/if}
	{/each}
</div>

{#if showModal}
	<div
		class="fixed inset-0 flex items-center justify-center bg-black/50 font-oswald"
		role="button"
		tabindex="0"
		transition:fade
	>
		<div
			transition:scale
			class="flex max-h-screen w-[32rem] max-w-[32rem] flex-col items-center gap-4 overflow-auto border-2 border-black bg-white p-3 text-xl"
		>
			<div class="flex items-center gap-2 font-cheap-pine-sans text-4xl">
				{#if progress < 1}
					Upload läuft
				{:else}
					Verarbeitung läuft
				{/if}
			</div>

			<p class="text-center font-oswald text-xl">
				Herzlichen Dank für deinen Beitrag zur Gallerie. Dank dir gibt es unsere Hochzeit von noch
				mehr Blickwinkeln zu erkunden 📷
			</p>

			{#if progress >= 1}
				<p class="text-center font-oswald text-xl">
					Dies wird einige Minuten dauern. Sobald deine Aufnahmen fertig sind, erscheinen sie hier.
				</p>
			{/if}

			{#if progress < 1}
				<progress value={progress}>{progress * 100} %</progress>
			{:else}
				<svg
					class="h-12 w-12 animate-spin text-black"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
					</circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					>
					</path>
				</svg>
			{/if}
		</div>
	</div>
{/if}
