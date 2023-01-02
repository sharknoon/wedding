<script lang="ts">
	import Divider from './divider.svelte';
	import Header from './header.svelte';
	import Footer from './footer.svelte';
	import DownloadButton from '../download-button.svelte';

	let downloadables: HTMLElement[] = [];
</script>

<div class="flex flex-col items-center gap-16">
	<DownloadButton {downloadables} />
	<div
		class="grid h-[220mm] max-h-[220mm] w-[331mm] grid-cols-3 gap-[6mm] bg-white py-[8mm] pl-[17mm] pr-[23mm] shadow-2xl"
		id="drinkmenu"
		bind:this={downloadables[0]}
	>
		<div class="flex h-full max-h-full flex-col border-2 border-dashed border-gray-900 p-3">
			<Header title="Alkoholfreie Getränke" />
			<Divider />
			<div class="flex grow flex-col items-center justify-center gap-8 font-oswald text-xl">
				<div>Mineralwasser ohne Kohlensäure</div>
				<div>Mineralwasser mit Kohlensäure</div>
				<div>Cola, Fanta, Sprite</div>
				<div>Orangensaft / -schorle</div>
				<div>Apfelsaft / -schorle</div>
				<div>TODO</div>
			</div>
			<Divider direction="up" />
			<Footer />
		</div>
		<div class="flex h-full max-h-full flex-col border-2 border-dashed border-gray-900 p-3">
			<Header title="Warme Getränke" />
			<Divider />
			<div class="flex grow flex-col items-center justify-center gap-8 font-oswald text-xl">
				<div>Schwarztee</div>
				<div>Früchtetee</div>
				<div>TODO</div>
			</div>
			<Divider direction="up" />
			<Footer />
		</div>
		<div class="flex h-full max-h-full flex-col border-2 border-dashed border-gray-900 p-3">
			<Header title="Alkoholische Getränke" />
			<Divider />
			<div class="flex grow flex-col items-center justify-center gap-8 font-oswald text-xl">
				<div>Bier 1 Alpirsbacher Klosterbräu</div>
				<div>Bier 2 Alpirsbacher Klosterbräu</div>
				<div>TODO</div>
			</div>
			<Divider direction="up" />
			<Footer />
		</div>
	</div>
	<div class="text-center">
		321x210mm, Aufsteller Prisma klein mit Mattfolie kaschiert, 300g Papier, <a
			class="hover:underline"
			href="https://www.wir-machen-druck.de/aufsteller-prisma-klein-mit-mattfolie-kaschiert.html"
			target="_blank"
			rel="noreferrer"
		>
			WIRmachenDRUCK
		</a>
		<br />
		Datenformat: 331x220mm, Beschnitt: 5mm, Sicherheitsabstand: 3mm
	</div>
</div>
