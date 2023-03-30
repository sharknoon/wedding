<script lang="ts">
	import DownloadButton from '../download-button.svelte';
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
			<div class="flex grow flex-col items-center justify-center gap-2 text-center font-oswald">
				<div class="font-cheap-pine-sans text-2xl">Vorspeise</div>
				<div>Tomaten-Basilikumsuppe mit Gin-Sahne und Croûtons</div>
				<div class="font-cheap-pine-sans text-2xl">Salat</div>
				<div>
					Mühlensalatteller: Marinierte Blatt- und Rohkostsalate mit hausgemachtem Kartoffelsalat
					und Joghurt-Kräuterdressing
				</div>
				<div class="font-cheap-pine-sans text-2xl">Buffet</div>
				<div>Gebratene Rinderrückensteaks</div>
				<div>Medaillons vom Schweinefilet</div>
				<div>Gebratene Tranches vom Lachs mit frischen Kräutern und Zitrone</div>
				<div>Panierte Schnitzel von der Putenbrust</div>
				<div class="font-cheap-pine-sans text-2xl">Beilagen</div>
				<div>Schwäbische Butterstpätzle, gebackene Kartoffelkrapfen, glasiertes Sommergemüse</div>
				<div class="font-cheap-pine-sans text-2xl">Vegetarisch</div>
				<div>Zweierlei vom Grünkern</div>
				<div>
					Cremiges Risotto und gebackene Falafel auf glasiertem Sommergemüse mit Parmesanspänen
				</div>
				<div class="font-cheap-pine-sans text-2xl">Nachtisch</div>
				<div>Schoko-Banane-Stracciatella Torte</div>
				<div>Brownie-Cheesecake Torte</div>
			</div>
		</div>
	</div>

	<div
		class="h-[216mm] max-h-[216mm] w-[154mm] gap-[6mm] bg-white p-[6mm] shadow-2xl"
		id="menucard-back"
		bind:this={downloadables[1]}
	>
		<div class="flex h-full max-h-full flex-col border-2 border-dashed border-gray-900 p-3">
			<Header title="Getränke" />
			<div class="flex grow flex-col items-center justify-center gap-1 text-center font-oswald">
				<div class="font-cheap-pine-sans text-2xl">Biere</div>
				<div>Alpirsbacher Pils / Spezial / Hefeweizen / Alkoholfrei</div>
				<div>Radler süß / sauer</div>
				<div class="font-cheap-pine-sans text-2xl">Weine</div>
				<div>Grauer Burgunder trocken - Weingut Kiefer, Baden</div>
				<div>Spätburgunder Weißherbst - Durbacher Winzergenossenschaft, Baden</div>
				<div>Trentatre Rosso - Rocca, Italien</div>
				<div class="font-cheap-pine-sans text-2xl">Alkoholfreie Getränke</div>
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
				<div class="font-cheap-pine-sans text-2xl">Heiße Getränke</div>
				<div>Tasse Kaffee / Kaffee Hag</div>
				<div>(Doppelter) Espresso, Milchkaffee, Cappuccino, Latte Macchiato</div>
				<div>Heiße Schokolade</div>
				<div>Kännchen Tee</div>
			</div>
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
