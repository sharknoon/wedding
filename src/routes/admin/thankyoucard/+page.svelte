<script lang="ts">
	import { onMount } from 'svelte';
	import QRCode from 'qrcode';
	import { details } from '$lib/client/stores';
	import DownloadButton from '../download-button.svelte';

	$: qrcode = '';

	onMount(() => {
		QRCode.toDataURL(
			`https://wedding.sharknoon.de/bilder?ref=Dankeskarte`,
			{
				errorCorrectionLevel: 'H',
				margin: 0,
				width: 160
			},
			(_, url) => (qrcode = url)
		);
	});

	let downloadables: HTMLElement[] = [];
</script>

<div class="flex flex-col items-center gap-16">
	<DownloadButton {downloadables} />
	<div
		class="grid h-[111mm] w-[302mm] max-w-[302mm] grid-cols-2 bg-white p-[6mm] shadow-2xl"
		id={'thankyou-outer'}
		bind:this={downloadables[0]}
	>
		<div class="relative">
			<div
				class="absolute left-8 top-8 h-2/3 w-2/3 border-2 border-black bg-cover bg-center bg-no-repeat"
				style="background-image: url(/images/wedding/danke.jpg);"
			/>
			<div
				class="absolute bottom-8 right-8 border-2 border-black bg-white p-2 font-oswald tracking-wide"
			>
				Midrène und Josua Frank<br />{$details?.privateStreet}<br />{$details?.privateCity}
			</div>
		</div>
		<div class="flex items-center justify-evenly gap-2">
			<div
				class="grid aspect-square h-64 w-64 grid-cols-3 grid-rows-3 divide-x-2 divide-y-2 divide-black border-b-2 border-r-2 border-black"
			>
				<div
					class="relative bg-black text-center font-cheap-pine-sans text-2xl uppercase tracking-wider text-white"
				>
					<span class="absolute inset-x-0 bottom-0">B l a c k</span>
				</div>
				<div
					class="col-span-2 bg-cover bg-center bg-no-repeat"
					style="background-image: url(/images/wedding/bruecke.jpg);"
				/>
				<div
					class="bg-cover bg-center bg-no-repeat"
					style="background-image: url(/images/wedding/straus.jpg);"
				/>
				<div
					class="row-span-2 bg-cover bg-center bg-no-repeat"
					style="background-image: url(/images/wedding/portrait.jpg);"
				/>
				<div
					class="bg-cover bg-center bg-no-repeat"
					style="background-image: url(/images/backgrounds/info.jpg);"
				/>
				<div
					class="bg-cover bg-center bg-no-repeat"
					style="background-image: url(/images/wedding/herz.jpg);"
				/>
				<div
					class="col-start-3 row-start-3 text-center font-cheap-pine-sans text-2xl tracking-wider"
				>
					W h i t e
				</div>
			</div>
			<div class="flex flex-col items-center gap-2">
				<h1 class="font-cheap-pine text-5xl uppercase tracking-widest">Danke</h1>
				<h1 class="font-cheap-pine text-5xl uppercase tracking-widest">schön</h1>
				<div class="pt-3 text-center font-cheap-pine-sans text-3xl uppercase">
					von <div class="inline-block text-red-600">Midrène</div>
					&
					<div class="inline-block text-red-600">Josua</div>
				</div>
				<div class="flex items-center gap-4 self-stretch">
					<div class="grow border-t-2 border-black" />
					<!-- old heroicons 1 icon -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-10 w-10 transition"
						viewBox="0 0 20 20"
						fill="rgb(220,38,38)"
					>
						<path
							fill-rule="evenodd"
							d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
							clip-rule="evenodd"
						/>
					</svg>
					<div class="grow border-t-2 border-black" />
				</div>
				<div
					class="mt-2 inline bg-black px-2 py-1 text-center font-cheap-pine-sans text-2xl tracking-widest text-white"
				>
					Für <span class="text-red-600">euer</span> Kommen
				</div>
			</div>
		</div>
	</div>

	<div
		class="grid h-[111mm] w-[302mm] max-w-[302mm] grid-cols-2 bg-white p-[6mm] shadow-2xl"
		id={'thankyou-inner'}
		bind:this={downloadables[1]}
	>
		<div class="flex flex-col items-center justify-center gap-6">
			<h1 class="font-cheap-pine text-4xl tracking-wide">Die Hochzeitsfotos</h1>
			<img
				src={qrcode}
				width="160"
				height="160"
				alt="qrcode"
				class="mx-2 self-center"
				style="image-rendering: pixelated;"
			/>
			<div class="font-cheap-pine-sans text-xl">wedding.sharknoon.de/bilder</div>
		</div>
		<div class="pl-8 pt-6">
			<p class="mt-2 font-oswald text-xl">
				Ihr habt dazu beigetragen,<br />
				dass dieser Tag für uns unvergesslich bleiben wird.<br /><br />
				Für die Hilfe und Unterstützung,<br />
				die vielen Ideen und tollen Überraschungen,<br />
				die zahlreichen Glückwünsche und Geschenke<br />
				bedanken wir uns von ganzem Herzen.<br /><br />
				Unser Tag war wunderbar!
			</p>
		</div>
	</div>

	<div class="text-center">
		296x105mm, Einladungskarte, gefalzt auf DIN A6 quer, 4-seiter, 300g Papier, <a
			class="hover:underline"
			href="https://www.wir-machen-druck.de/einladungskarte-gefalzt-auf-din-a6-quer-4seiter.html"
			target="_blank"
			rel="noreferrer"
		>
			WIRmachenDRUCK
		</a>
		<br />
		Datenformat: 302x111mm, Beschnitt: 3mm, Sicherheitsabstand: 3mm
	</div>
</div>
