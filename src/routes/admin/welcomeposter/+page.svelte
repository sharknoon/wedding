<script lang="ts">
	import DownloadButton from '../download-button.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const date = new Date(data.details.date);
	const location = data.details.locationName;

	let downloadables: HTMLElement[] = [];
</script>

<div class="flex flex-col items-center gap-8">
	<DownloadButton {downloadables} scale={4} />
	<div
		class="h-[567.33mm] w-[402.66mm] max-w-[402.66mm] bg-white p-[5mm] shadow-2xl"
		id="welcomeposter"
		bind:this={downloadables[0]}
	>
		<div
			class="flex h-full flex-col items-center justify-evenly border-[5px] border-dashed border-black"
		>
			<div class="grid aspect-square h-[52.5rem] grid-cols-2">
				<div
					style="background-image: url('/images/people/midrene-and-josua-large.avif')"
					class="col-start-1 row-start-1 bg-cover bg-center bg-no-repeat"
				/>
				<div class="col-start-2 row-start-1 flex flex-col">
					<div
						class="flex flex-1 items-end justify-center text-center font-cheap-pine-sans text-[6rem] uppercase leading-none tracking-wider"
					>
						B l a c k
					</div>
					<div
						class="flex-1 bg-black text-center font-cheap-pine-sans text-[6rem] uppercase leading-none tracking-wider text-white"
					>
						W h i t e
					</div>
				</div>
			</div>

			<div class="flex flex-col justify-center gap-10 text-center">
				<h1 class="font-cheap-pine text-9xl">Herzlich Willkommen</h1>
				<div class="font-cheap-pine text-7xl uppercase">zur Hochzeit</div>
				<div class="font-cheap-pine-sans text-8xl uppercase">
					von <span class="text-red-600">Midrène</span> & <span class="text-red-600">Josua</span>
				</div>
				<div class="pb-2 pt-1 font-cheap-pine-sans text-5xl uppercase leading-4 tracking-wider">
					Gesucht und Gefunden, in Liebe verbunden
				</div>
				<div class="mx-16 flex items-center gap-5 px-5">
					<div class="grow border-t-[5px] border-black" />
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-20 w-20"
						viewBox="0 0 20 20"
						fill="rgb(220,38,38)"
					>
						<path
							fill-rule="evenodd"
							d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
							clip-rule="evenodd"
						/>
					</svg>
					<div class="grow border-t-[5px] border-black" />
				</div>
				<div class="font-cheap-pine-sans text-6xl leading-none">{location}</div>
				<div class="font-cheap-pine-sans text-5xl leading-none text-red-600">
					{date.toLocaleDateString('DE-DE', {
						day: '2-digit',
						month: 'long',
						year: 'numeric'
					})}
				</div>
			</div>
		</div>
	</div>

	<div class="text-center">
		594x841mm, Veranstaltungsplakat auf Hohlkammerplatte DIN A1 einseitig 4/0-farbig bedruckt,
		plano, <a
			class="hover:underline"
			href="https://www.wir-machen-druck.de/veranstaltungsplakat-auf-hohlkammerplatte-din-a1-einseitig-40farbig-bedruckt-plano.html"
			target="_blank"
			rel="noreferrer"
		>
			WIRmachenDRUCK
		</a>
		<br />
		Datenformat: 604x851mm, Beschnitt: 5mm, Sicherheitsabstand: 3mm
	</div>
</div>
