<script lang="ts">
	import { downloadIds } from '$lib/stores';
	import Divider from './divider.svelte';
	import Header from './header.svelte';
	import Footer from './footer.svelte';

	$downloadIds = ['drinkmenu'];
</script>

<div class="flex flex-col items-center gap-16">
	<div
		class="grid h-[307mm] max-h-[307mm] w-[394mm] grid-cols-3 gap-[6mm] bg-white py-[5mm] pl-[11mm] pr-[17mm] shadow-2xl"
		id="drinkmenu"
	>
		<div class="flex h-full max-h-full flex-col border-2 border-dashed border-gray-900 p-[3mm]">
			<Header title="Alkoholfreie Getränke" />
			<Divider />
			<div class="flex grow flex-col items-center justify-center gap-8 font-oswald text-2xl">
				<div>Mineralwasser ohne Kohlensäure</div>
				<div>Mineralwasser mit Kohlensäure</div>
				<div>Cola, Fanta, Sprite</div>
				<div>Orangensaft / -schorle</div>
				<div>Apfelsaft / -schorle</div>
				<div>TODO</div>
			</div>
			<Divider direction="up" />
			<Footer />
			<span class="text-center text-sm tracking-widest text-gray-700">
				x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;
				x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;
				x&nbsp;&nbsp;&nbsp;&nbsp;x
			</span>
		</div>
		<div class="flex h-full max-h-full flex-col border-2 border-dashed border-gray-900 p-[3mm]">
			<Header title="Warme Getränke" />
			<Divider />
			<div class="flex grow flex-col items-center justify-center gap-8 font-oswald text-2xl">
				<div>Schwarztee</div>
				<div>Früchtetee</div>
				<div>TODO</div>
			</div>
			<Divider direction="up" />
			<Footer />
			<span class="text-center text-sm tracking-widest text-gray-700">
				x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;
				x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;
				x&nbsp;&nbsp;&nbsp;&nbsp;x
			</span>
		</div>
		<div class="flex h-full max-h-full flex-col border-2 border-dashed border-gray-900 p-[3mm]">
			<Header title="Alkoholische Getränke" />
			<Divider />
			<div class="flex grow flex-col items-center justify-center gap-8 font-oswald text-2xl">
				<div>Bier 1 Alpirsbacher Klosterbräu</div>
				<div>Bier 2 Alpirsbacher Klosterbräu</div>
				<div>TODO</div>
			</div>
			<Divider direction="up" />
			<Footer />
			<span class="text-center text-sm tracking-widest text-gray-700">
				x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;
				x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;
				x&nbsp;&nbsp;&nbsp;&nbsp;x
			</span>
		</div>
	</div>
	<div class="text-center">
		384x297mm, Aufsteller Prisma groß mit Mattfolie kaschiert, <a
			class="hover:underline"
			href="https://www.wir-machen-druck.de/aufsteller-prisma-gross-mit-mattfolie-kaschiert.html"
			target="_blank"
		>
			WIRmachenDRUCK
		</a>
		<br />
		Datenformat: 394x307mm, Beschnitt: 5mm, Sicherheitsabstand: 3mm
	</div>
</div>
