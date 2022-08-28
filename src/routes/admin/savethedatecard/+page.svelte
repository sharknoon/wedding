<script lang="ts">
	import { onMount } from 'svelte';
	import QRCode from 'qrcode';
	import { downloadIds } from '$lib/stores';
	import type { PageData } from './$types';

	export let data: PageData;

	$downloadIds = ['savethedate-front', 'savethedate-back'];

	$: qrcode = '';

	onMount(() => {
		QRCode.toDataURL(
			`https://midrene-und-josua.de/${data.id}`,
			{
				errorCorrectionLevel: 'H',
				margin: 0,
				width: 128
			},
			(_, url) => (qrcode = url)
		);
	});
</script>

<div class="flex h-full flex-col items-center justify-center gap-16">
	<div
		class="flex h-[18rem] w-[42rem] max-w-[42rem] bg-white p-2 shadow-2xl"
		id="savethedate-front"
	>
		<div class="grid w-full grid-cols-5 grid-rows-1">
			<div
				style="background-image: url('/images/people/midrene-and-josua-large.png')"
				class="col-start-1 row-start-1 bg-cover bg-center bg-no-repeat grayscale"
			/>
			<div class="col-start-2 row-start-1 flex flex-col">
				<div
					class="flex flex-1 items-end justify-center text-center font-cheap-pine-sans text-4xl uppercase tracking-widest"
				>
					B l a c k
				</div>
				<div
					class="flex-1 bg-black text-center font-cheap-pine-sans text-4xl uppercase tracking-widest text-white"
				>
					W h i t e
				</div>
			</div>
			<div class="col-span-3 flex flex-col justify-center">
				<div class="text-center font-cheap-pine text-4xl uppercase">Die Hochzeit</div>
				<div class="pt-3 text-center font-cheap-pine-sans text-3xl uppercase">
					von <span class="text-red-600">Midrène</span> & <span class="text-red-600">Josua</span>
				</div>
				<div
					class="pb-1 text-center font-cheap-pine-sans text-lg uppercase leading-4 tracking-wider"
				>
					Gesucht und Gefunden, in Liebe verbunden
				</div>
				<div class="mx-12 flex items-center gap-4 px-4">
					<div class="grow border-t-2 border-black" />
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-10 w-10"
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
				<div class="text-center font-cheap-pine-sans text-3xl leading-none">Save the Date</div>
				<div class="text-center font-cheap-pine-sans text-2xl leading-none text-red-600">
					23.09.2023
				</div>
			</div>
		</div>
	</div>

	<div class="flex h-[18rem] w-[42rem] max-w-[42rem] bg-white p-2 shadow-2xl" id="savethedate-back">
		<div
			class="rotate-180 border-l-2 border-black pl-2 text-center text-2xl text-red-600 vertical-lr"
		>
			23 09 23
		</div>
		<div class="flex grow flex-col justify-between divide-y-2 divide-black px-2">
			<div class="flex items-center py-4">
				<div class="mx-6 grow border-t-2 border-black bg-black" />
				<span class="font-cheap-pine text-5xl uppercase">Die Hochzeit</span>
				<div class="mx-6 grow border-t-2 border-black bg-black" />
			</div>
			<div class="flex gap-1 p-1">
				<div class="grid grid-cols-5 grid-rows-5 items-center justify-center">
					<div
						class="col-span-5 col-start-1 row-start-1 text-center font-cheap-pine-sans text-lg uppercase leading-none"
					>
						September
					</div>
					<div
						class="col-start-1 row-span-5 row-start-1 rotate-180 justify-self-center font-cheap-pine-sans text-lg uppercase leading-[1.1] vertical-lr"
					>
						Samstag
					</div>
					<div
						class="col-span-3 col-start-2 row-span-3 row-start-2 text-center font-cheap-pine text-7xl leading-[0.75]"
					>
						23
					</div>
					<div
						class="col-start-5 row-span-5 row-start-1 rotate-180 justify-self-center font-cheap-pine-sans text-lg uppercase leading-[1.1] vertical-lr"
					>
						Ab 14 Uhr
					</div>
					<div
						class="col-span-5 col-start-1 row-start-5 text-center font-cheap-pine-sans text-2xl uppercase leading-[0.8]"
					>
						2 0 2 3
					</div>
				</div>
				<div class="flex grow flex-col gap-1">
					<div
						class="flex items-center justify-evenly bg-black text-center font-cheap-pine-sans text-2xl uppercase tracking-widest text-white"
					>
						<span>B l a c k</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-8 w-8"
							viewBox="0 0 20 20"
							fill="rgb(220,38,38)"
						>
							<path
								fill-rule="evenodd"
								d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
								clip-rule="evenodd"
							/>
						</svg>
						<span> W h i t e </span>
					</div>
					<div class="flex grow divide-x-2 divide-black">
						<div class="flex grow items-center justify-center gap-2 font-cheap-pine-sans">
							<div class="text-center">
								<span class="text-sm">Abschnitt</span>
								<br />
								<span class="text-xl">23</span>
							</div>
							<div class="text-center">
								<span class="text-sm">Reihe</span>
								<br />
								<span class="text-xl">09</span>
							</div>
							<div class="text-center">
								<span class="text-sm">Sitz</span>
								<br />
								<span class="text-xl">2023</span>
							</div>
						</div>
						<div class="flex grow items-center justify-center font-cheap-pine-sans">
							<div class="text-center">
								<span>Ticketpreis:</span>
								<br />
								<span class="text-2xl">Unbezahlbar €</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="py-1 text-center font-cheap-pine-sans text-lg leading-tight">
				<span>Wir bitten um eine Rückmeldung bis zum 23.03.2023.</span>
				<br />
				<span
					>Nutzt dazu bitte den <span class="text-red-600">QR-Code</span> /
					<span class="text-red-600">Link</span> auf der rechten Seite.</span
				>
			</div>
			<div class="text-center font-cheap-pine-sans text-2xl uppercase tracking-wider">
				Wir freuen uns auf eure Antwort
			</div>
		</div>
		<div class="flex flex-col items-center justify-evenly">
			<div class="text-center font-cheap-pine-sans text-sm">
				www.midrene-und-josua.de<br />/{data.id}
			</div>
			<img src={qrcode} alt="qrcode" class="mx-2 self-center" style="image-rendering: pixelated;" />
			<div class="tansform rotate-180 text-center font-cheap-pine-sans text-sm">
				www.midrene-und-josua.de<br />/{data.id}
			</div>
		</div>
		<div class="flex items-center justify-center gap-3 border-l-2 border-black py-1 vertical-lr">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 rotate-90 text-red-600"
				viewBox="0 0 20 20"
				fill="currentcolor"
			>
				<path d="M20 7h-7L10 .5 7 7H0l5.46 5.47-1.64 7 6.18-3.7 6.18 3.73-1.63-7z" />
			</svg>
			<div class="grow border border-black bg-black" />
			<div class="font-cheap-pine text-3xl">Save the Date</div>
			<div class="grow border border-black bg-black" />
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 rotate-90 text-red-600"
				viewBox="0 0 20 20"
				fill="currentcolor"
			>
				<path d="M20 7h-7L10 .5 7 7H0l5.46 5.47-1.64 7 6.18-3.7 6.18 3.73-1.63-7z" />
			</svg>
		</div>
		<div class="border-l-2 border-black pl-2 text-center text-2xl text-red-600 vertical-lr">
			23 09 23
		</div>
	</div>
</div>
