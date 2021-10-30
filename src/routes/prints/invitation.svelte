<script lang="ts">
	import { onMount } from 'svelte';
	import QRCode from 'qrcode';

	onMount(() => {
		QRCode.toCanvas(
			document.getElementById('qrcode'),
			'https://midrene-und-josua.de/invitation/jessica',
			{
				errorCorrectionLevel: 'H',
				margin: 0,
				width: 128
			}
		);
	});
</script>

<div class="flex shadow-2xl h-[18rem] w-[42rem] p-2 bg-white">
	<div class="grid grid-rows-1 grid-cols-5 w-full">
		<div class="col-start-1 row-start-1 image bg-cover bg-center bg-no-repeat filter grayscale" />
		<div class="col-start-2 row-start-1 flex flex-col">
			<div
				class="flex-1 flex justify-center items-end text-center text-4xl uppercase font-cheap-pine-sans tracking-widest"
			>
				B l a c k
			</div>
			<div
				class="flex-1 bg-black text-white text-center text-4xl uppercase font-cheap-pine-sans tracking-widest"
			>
				W h i t e
			</div>
		</div>
		<div class="col-span-3 flex flex-col justify-center">
			<div class="uppercase text-center font-cheap-pine text-4xl">Die Hochzeit</div>
			<div class="pt-3 uppercase text-3xl text-center font-cheap-pine-sans">
				von <span class="text-red-600">Midrène</span> & <span class="text-red-600">Josua</span>
			</div>
			<div class="text-center uppercase font-cheap-pine-sans tracking-wider leading-4 pb-1 text-lg">
				Gesucht und Gefunden, in Liebe verbunden
			</div>
			<div class="flex gap-4 px-4 mx-12 items-center">
				<div class="flex-grow border-t-2 border-black" />
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
				<div class="flex-grow border-t-2 border-black" />
			</div>
			<div class="font-cheap-pine-sans text-center text-3xl leading-none">Save the Date</div>
			<div class="font-cheap-pine-sans text-center text-2xl text-red-600 leading-none">
				23.09.2023
			</div>
		</div>
	</div>
</div>

<div class="flex shadow-2xl h-[18rem] w-[42rem] p-2 bg-white">
	<div
		class="text-center text-2xl text-red-600 pl-2 border-l-2 border-black vertical-lr transform rotate-180"
	>
		23 09 23
	</div>
	<div
		class="flex-grow flex flex-col justify-between divide-y-2 divide-black px-2 border-r-[0.1rem] border-dashed border-gray-400"
	>
		<div class="flex items-center py-4">
			<div class="flex-grow border-t-2 border-black bg-black mx-6" />
			<span class="text-5xl font-cheap-pine uppercase">Die Hochzeit</span>
			<div class="flex-grow border-t-2 border-black bg-black mx-6" />
		</div>
		<div class="flex gap-1 p-1">
			<div class="grid grid-cols-5 grid-rows-5 justify-center items-center">
				<div
					class="col-start-1 col-span-5 row-start-1 font-cheap-pine-sans leading-none text-lg uppercase text-center"
				>
					September
				</div>
				<div
					class="col-start-1 row-start-1 row-span-5 uppercase font-cheap-pine-sans leading-[1.1] text-lg justify-self-center vertical-lr transform rotate-180"
				>
					Samstag
				</div>
				<div
					class="col-start-2 row-start-2 col-span-3 row-span-3 text-center font-cheap-pine leading-[0.75] text-7xl"
				>
					23
				</div>
				<div
					class="col-start-5 row-start-1 row-span-5 uppercase font-cheap-pine-sans leading-[1.1] text-lg justify-self-center vertical-lr transform rotate-180"
				>
					Ab 14 Uhr
				</div>
				<div
					class="col-start-1 col-span-5 row-start-5 font-cheap-pine-sans text-2xl leading-[0.8] uppercase text-center"
				>
					2 0 2 3
				</div>
			</div>
			<div class="flex-grow flex flex-col gap-1">
				<div
					class="bg-black text-white text-2xl text-center font-cheap-pine-sans uppercase tracking-widest flex items-center justify-evenly"
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
				<div class="flex-grow flex divide-x-2 divide-black">
					<div class="flex-grow flex justify-center items-center gap-2 font-cheap-pine-sans">
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
					<div class="flex-grow flex justify-center items-center font-cheap-pine-sans">
						<div class="text-center">
							<span>Ticketpreis:</span>
							<br />
							<span class="text-2xl">Unbezahlbar €</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="font-cheap-pine-sans text-lg text-center leading-tight py-1">
			<span>Wir bitten um eine Rückmeldung bis zum 23.03.2023.</span>
			<br />
			<span
				>Nutzt dazu bitte den <span class="text-red-600">QR-Code</span> /
				<span class="text-red-600">Link</span> auf der rechten Seite.</span
			>
		</div>
		<div class="text-center uppercase font-cheap-pine-sans text-2xl tracking-wider">
			Wir freuen uns auf eure Antwort
		</div>
	</div>
	<div class="flex flex-col items-center justify-evenly">
		<div class="text-center text-sm font-cheap-pine-sans">
			https://midrene-und-josua.de<br />/invitation/jessica
		</div>
		<canvas id="qrcode" class="self-center mx-2" />
		<div class="text-center text-sm font-cheap-pine-sans tansform rotate-180">
			https://midrene-und-josua.de<br />/invitation/jessica
		</div>
	</div>
	<div class="flex justify-center items-center gap-3 py-1 border-l-2 border-black vertical-lr">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="transform rotate-90 text-red-600 h-6 w-6"
			viewBox="0 0 20 20"
			fill="currentcolor"
		>
			<path d="M20 7h-7L10 .5 7 7H0l5.46 5.47-1.64 7 6.18-3.7 6.18 3.73-1.63-7z" />
		</svg>
		<div class="flex-grow border border-black bg-black" />
		<div class="font-cheap-pine text-3xl">Save the Date</div>
		<div class="flex-grow border border-black bg-black" />
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="transform rotate-90 text-red-600 h-6 w-6"
			viewBox="0 0 20 20"
			fill="currentcolor"
		>
			<path d="M20 7h-7L10 .5 7 7H0l5.46 5.47-1.64 7 6.18-3.7 6.18 3.73-1.63-7z" />
		</svg>
	</div>
	<div class="text-center text-2xl text-red-600 pl-2 border-l-2 border-black vertical-lr">
		23 09 23
	</div>
</div>

<style lang="postcss">
	.image {
		background-image: url('/images/people/heads.jpg');
	}
</style>
