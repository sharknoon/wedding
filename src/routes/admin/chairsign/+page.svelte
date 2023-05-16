<script lang="ts">
	import DownloadButton from '../download-button.svelte';

	const downloadables: HTMLElement[] = [];

	const members: string[] = [
		'die Mutter der Braut',
		'den Vater der Braut',
		'Hannelore',
		'unsere Trauzeugin',
		'unseren Trauzeuge',
		'die Mutter des Bräutigams',
		'Frank',
		'die Schwester des Bräutigams',
		'die Schwester des Bräutigams',
		'den Schwager des Bräutigams'
	];
</script>

<div class="flex flex-col items-center gap-16">
	<DownloadButton {downloadables} scale={4} />
	{#each members as member, i}
		<div class="drop-shadow-2xl" id="chairsign-{i}" bind:this={downloadables[i]}>
			<div class="clipped relative h-[216mm] w-[111mm] max-w-[111mm] bg-white p-[6mm] shadow-2xl">
				<div
					class="absolute right-1/2 top-[8mm] h-4 w-4 translate-x-1/2 rounded-full bg-gray-200"
				/>
				<svg
					class="absolute inset-0"
					width="111mm"
					height="216mm"
					version="1.1"
					viewBox="0 0 111 216"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="m6 35 29-29h41l29 29v167l-49.5-49.5-49.5 49.5z"
						fill="none"
						stroke="#000"
						stroke-dasharray="3"
						stroke-dashoffset="1"
					/>
				</svg>

				<div class="flex h-full flex-col justify-center p-6 pb-36 text-center">
					<h1 class="col-span-3 m-3 font-cheap-pine-sans text-6xl">
						Dieser Stuhl ist reserviert für
					</h1>
					<div class="m-3 font-cheap-pine text-7xl text-red-600">{member}</div>
				</div>
			</div>
		</div>
	{/each}

	<div class="text-center">
		105x210mm, Flyer DIN lang - Topseller, einseitig bedruckt, 400g Papier, <a
			class="hover:underline"
			href="https://www.wir-machen-druck.de/flyer-din-lang-105-cm-x-210-cm-topseller-einseitig-bedruckt.html"
			target="_blank"
			rel="noreferrer"
		>
			WIRmachenDRUCK
		</a>
		<br />
		Datenformat: 111x216mm, Beschnitt: 3mm, Sicherheitsabstand: 3mm
	</div>
</div>

<style>
	.clipped {
		--edge-length: 32mm;
		--width: 111mm;
		clip-path: polygon(
			var(--edge-length) 0%,
			calc(100% - var(--edge-length)) 0%,
			100% var(--edge-length),
			100% 100%,
			50% calc(100% - calc(var(--width) / 2)),
			0 100%,
			0% var(--edge-length)
		);
	}
</style>
