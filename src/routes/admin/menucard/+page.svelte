<script lang="ts">
	import DownloadButton from '../download-button.svelte';
	import Divider from './divider.svelte';
	import Footer from './footer.svelte';
	import Header from './header.svelte';

	let downloadables: HTMLElement[] = [];
</script>

<div class="flex flex-col items-center gap-16">
	<DownloadButton {downloadables} />
	<div
		class="h-[216mm] max-h-[216mm] w-[154mm] gap-[6mm] bg-white p-[6mm] shadow-2xl"
		id="menucard-front"
		bind:this={downloadables[0]}
	>
		<div class="flex h-full max-h-full flex-col border-2 border-dashed border-gray-900 p-3">
			<Header title="Menü" />
			<Divider />
			<div
				class="flex grow flex-col items-center justify-center gap-2 text-center font-oswald text-xl"
			>
				<div class="font-cheap-pine-sans text-3xl">Vorspeise</div>
				<div>Tomaten-Basilikumsuppe mit Gin-Sahne und Croûtons</div>
				<div class="font-cheap-pine-sans text-3xl">Buffet</div>
				<div>Karotten-. Kraut-, Gurken und Kartoffelsalat</div>
				<div>Rinderrücken Steak oder im Ganzen gebraten</div>
				<div>Gebratenes Lachsfilet mit Kräutern</div>
				<div>Risotto und Falaffel von Grünkern mit mediterranem Gemüse und Parmesanspänen</div>
				<div class="font-cheap-pine-sans text-3xl">Beilagen</div>
				<div>Schwäbische Butterstpätzle, Pommes Frites</div>
				<div class="font-cheap-pine-sans text-3xl">Nachtisch</div>
				<div>Schoko-Banane-Stracciatella Torte</div>
				<div>Brownie-Cheesecake Torte</div>
			</div>
			<Divider direction="up" />
			<Footer />
		</div>
	</div>

	<div
		class="h-[216mm] max-h-[216mm] w-[154mm] gap-[6mm] bg-white p-[6mm] shadow-2xl"
		id="menucard-back"
		bind:this={downloadables[1]}
	>
		<div class="flex h-full max-h-full flex-col border-2 border-dashed border-gray-900 p-3">
			<Header title="Getränke" />
			<Divider />
			<div
				class="flex grow flex-col items-center justify-center gap-2 text-center font-oswald text-xl"
			>
				<div class="font-cheap-pine-sans text-3xl">Alkoholische Getränke</div>
				<div>Bier 1 Alpirsbacher Klosterbräu</div>
				<div>Bier 2 Alpirsbacher Klosterbräu</div>
				<div>TODO</div>
				<div>TODO</div>
				<div class="font-cheap-pine-sans text-3xl">Alkoholfreie Getränke</div>
				<div>Mineralwasser ohne / mit Kohlensäure</div>
				<div>Cola, Fanta, Sprite</div>
				<div>Orangensaft / -schorle</div>
				<div>Apfelsaft / -schorle</div>
				<div>TODO</div>
				<div class="font-cheap-pine-sans text-3xl">Heißgetränke</div>
				<div>Schwarztee</div>
				<div>Früchtetee</div>
				<div>TODO</div>
			</div>
			<Divider direction="up" />
		</div>
	</div>

	<div class="text-center">
		148x210mm, Speisekarte DIN A5, beidseitig bedruckt, 250g Papier, <a
			class="hover:underline"
			href="https://www.wir-machen-druck.de/speisekarte-din-a5-148-cm-x-210-cm-beidseitig-bedruckt.html"
			target="_blank"
			rel="noreferrer"
		>
			WIRmachenDRUCK
		</a>
		<br />
		Datenformat: 154x216mm, Beschnitt: 3mm, Sicherheitsabstand: 6mm
	</div>
</div>
