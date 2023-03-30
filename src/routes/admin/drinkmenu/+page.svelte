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
			<div
				class="flex grow flex-col items-center justify-center gap-6 text-center font-oswald text-xl"
			>
				<div>Tafelwasser still / prickelnd</div>
				<div>Cola / Cola light / Fanta / Spezi</div>
				<div>Apfel- / Annanas- / Orangen- / Johannisbeersaft</div>
				<div>Cranberry- / Maracuja-Nektar</div>
				<div>Saftschorle nach Wunsch</div>
				<div>Dianas Schorle (Cranberry, Bitterlemon, Mineralwasser)</div>
				<div>Bitter Lemon / Tonic Water / Ginger Ale</div>
				<div>
					Alpi Klostergarten-Limonaden (Apfel-Rosmarin / Birne-Ingwer / Apfel-Johannisbeer-Lavendel)
				</div>
			</div>
			<Divider direction="up" />
			<Footer />
		</div>
		<div class="flex h-full max-h-full flex-col border-2 border-dashed border-gray-900 p-3">
			<Header title="Heiße Getränke" />
			<Divider />
			<div
				class="flex grow flex-col items-center justify-center gap-6 text-center font-oswald text-xl"
			>
				<div>Tasse Kaffee / Kaffee Hag</div>
				<div>(Doppelter) Espresso, Milchkaffee, Cappuccino, Latte Macchiato</div>
				<div>Heiße Schokolade</div>
				<div>Kännchen Tee</div>
			</div>
			<Divider direction="up" />
			<Footer />
		</div>
		<div class="flex h-full max-h-full flex-col border-2 border-dashed border-gray-900 p-3">
			<Header title="Alkoholische Getränke" />
			<Divider />
			<div
				class="flex grow flex-col items-center justify-center gap-6 text-center font-oswald text-xl"
			>
				<div class="font-cheap-pine-sans text-3xl">Biere</div>
				<div>Alpirsbacher Pils / Spezial / Hefeweizen / Alkoholfrei</div>
				<div>Radler süß / sauer</div>
				<div class="font-cheap-pine-sans text-3xl">Weine</div>
				<div>Grauer Burgunder trocken - Weingut Kiefer, Baden</div>
				<div>Spätburgunder Weißherbst - Durbacher Winzergenossenschaft, Baden</div>
				<div>Trentatre Rosso - Rocca, Italien</div>
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
