<script lang="ts">
	import { onMount } from 'svelte';
	import QRCode from 'qrcode';
	import { details, downloadIds } from '$lib/client/stores';
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;

	$: date = new Date($details?.date);
	$: deadline = new Date($details?.deadline);

	$downloadIds = [`savethedate-front-${data.slug}`, `savethedate-back-${data.slug}`];

	$: qrcode = '';

	onMount(() => {
		QRCode.toDataURL(
			`${$page.url.origin}/${data.slug}`,
			{
				errorCorrectionLevel: 'H',
				margin: 0,
				width: 160
			},
			(_, url) => (qrcode = url)
		);
	});
</script>

<div class="flex flex-col items-center gap-16">
	<div
		class="flex h-[105mm] w-[216mm] max-w-[216mm] bg-white p-[6mm] shadow-2xl"
		id={'savethedate-front-' + data.slug}
	>
		<div class="grid w-full grid-cols-5 grid-rows-1">
			<div
				style="background-image: url('/images/people/midrene-and-josua-large.avif')"
				class="col-start-1 row-start-1 bg-cover bg-center bg-no-repeat"
			/>
			<div class="col-start-2 row-start-1 flex flex-col">
				<div
					class="flex flex-1 items-end justify-center text-center font-cheap-pine-sans text-5xl uppercase tracking-wider"
				>
					B l a c k
				</div>
				<div
					class="flex-1 bg-black text-center font-cheap-pine-sans text-5xl uppercase tracking-wider text-white"
				>
					W h i t e
				</div>
			</div>
			<div class="col-span-3 flex flex-col justify-center">
				<div class="text-center font-cheap-pine text-5xl uppercase">Die Hochzeit</div>
				<div class="pt-4 text-center font-cheap-pine-sans text-4xl uppercase">
					von <span class="text-red-600">Midrène</span> & <span class="text-red-600">Josua</span>
				</div>
				<div
					class="pt-1 pb-2 text-center font-cheap-pine-sans text-xl uppercase leading-4 tracking-wider"
				>
					Gesucht und Gefunden, in Liebe verbunden
				</div>
				<div class="mx-16 flex items-center gap-5 px-5">
					<div class="grow border-t-[3px] border-black" />
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-12 w-12"
						viewBox="0 0 20 20"
						fill="rgb(220,38,38)"
					>
						<path
							fill-rule="evenodd"
							d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
							clip-rule="evenodd"
						/>
					</svg>
					<div class="grow border-t-[3px] border-black" />
				</div>
				<div class="text-center font-cheap-pine-sans text-4xl leading-none">Save the Date</div>
				<div class="text-center font-cheap-pine-sans text-3xl leading-none text-red-600">
					{date.toLocaleDateString('DE-DE', {
						day: '2-digit',
						month: 'long',
						year: 'numeric'
					})}
				</div>
			</div>
		</div>
	</div>

	<div
		class="h-[105mm] w-[216mm] max-w-[216mm] bg-white p-[6mm] shadow-2xl"
		id={'savethedate-back-' + data.slug}
	>
		<div class="flex h-full flex-col border-2 border-dashed border-black p-4 font-oswald text-2xl">
			<div class="flex grow flex-col justify-center gap-2 text-center">
				<p>Wir werden heiraten!</p>
				<p>
					Bitte haltet euch deswegen den {date.toLocaleDateString('DE-DE', {
						day: '2-digit',
						month: 'long',
						year: 'numeric'
					})} frei.
				</p>
				<p>Details und Ort folgen.</p>
			</div>
			<hr class="my-1 border border-black" />
			<hr class="my-1 border-[2px] border-black" />
			<div class="mt-2 flex items-stretch justify-evenly">
				<span class="pr-2 font-cheap-pine text-7xl">
					{date.toLocaleDateString('DE-DE', {
						day: '2-digit'
					})}</span
				>
				<div class="border-l-2 border-black" />
				<div class="flex flex-col justify-evenly px-2 text-center">
					<span
						class="bg-black px-1 font-cheap-pine-sans text-2xl leading-none tracking-widest text-white"
					>
						{date.toLocaleDateString('DE-DE', {
							month: 'long'
						})}
					</span>
					<span class="font-cheap-pine-sans text-5xl font-bold leading-[0.85] tracking-widest"
						>{date.toLocaleDateString('DE-DE', {
							year: 'numeric'
						})}</span
					>
				</div>
				<div class="border-l-2 border-black" />
				<div class="flex items-center justify-between px-4 text-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-9 w-9 text-red-600"
						viewBox="0 0 20 20"
						fill="currentcolor"
					>
						<path d="M20 7h-7L10 .5 7 7H0l5.46 5.47-1.64 7 6.18-3.7 6.18 3.73-1.63-7z" />
					</svg>
					<div class="flex flex-col">
						<span class="font-cheap-pine-sans text-3xl leading-none tracking-widest">
							Midrène's und Josua's
						</span>
						<span class="font-cheap-pine text-5xl tracking-widest">Hochzeit</span>
					</div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-9 w-9 text-red-600"
						viewBox="0 0 20 20"
						fill="currentcolor"
					>
						<path d="M20 7h-7L10 .5 7 7H0l5.46 5.47-1.64 7 6.18-3.7 6.18 3.73-1.63-7z" />
					</svg>
				</div>
			</div>
		</div>
	</div>

	<div class="text-center">
		210x99mm, Einladungskarte DIN lang Quer, beidseitig bedruckt, <a
			class="hover:underline"
			href="https://www.wir-machen-druck.de/einladungskarte-din-lang-quer-210-cm-x-99-cm-beidseitig-bedruckt.html"
			target="_blank"
		>
			WIRmachenDRUCK
		</a>
		<br />
		Datenformat: 216x105mm, Beschnitt: 3mm, Sicherheitsabstand: 3mm
	</div>
</div>
