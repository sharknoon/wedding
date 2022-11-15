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
		class="h-[216mm] max-h-[216mm] w-[106mm] gap-[6mm] bg-white p-[6mm] shadow-2xl"
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
				<div>Hochzeitstorte</div>
			</div>
			<Divider direction="up" />
			<Footer />
		</div>
	</div>

	<div
		class="h-[216mm] max-h-[216mm] w-[106mm] gap-[6mm] bg-white p-[6mm] shadow-2xl"
		id="menucard-back"
		bind:this={downloadables[1]}
	>
		<div class="flex h-full max-h-full flex-col border-2 border-dashed border-gray-900 p-3">
			<Divider />
			<div class="flex grow flex-col items-center justify-center gap-8">
				<div class="mx-12 flex items-center gap-4 self-stretch px-4">
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
				<div
					class="pb-1 text-center font-cheap-pine-sans text-xl uppercase leading-4 tracking-wider"
				>
					Gesucht und Gefunden, in Liebe verbunden
				</div>
			</div>
			<Divider direction="up" />
		</div>
	</div>

	<div class="text-center">
		100x210mm, Speisekarte DIN lang, beidseitig bedruckt, 250g Papier, <a
			class="hover:underline"
			href="https://www.wir-machen-druck.de/speisekarte-din-lang-100-cm-x-210-cm-beidseitig-bedruckt.html"
			target="_blank"
		>
			WIRmachenDRUCK
		</a>
		<br />
		Datenformat: 106x216mm, Beschnitt: 3mm, Sicherheitsabstand: 6mm
	</div>
</div>
