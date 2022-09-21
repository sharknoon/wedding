<script lang="ts">
	import { downloadIds } from '$lib/client/stores';
	import Divider from './divider.svelte';
	import Footer from './footer.svelte';
	import Header from './header.svelte';

	$downloadIds = ['menucard'];
</script>

<div class="flex flex-col items-center gap-16">
	<div
		class="h-[216mm] max-h-[216mm] w-[154mm] gap-[6mm] bg-white p-[6mm] shadow-2xl"
		id="menucard"
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
	<div class="text-center">
		148x210mm, Speisekarte DIN A5, beidseitig bedruckt, <a
			class="hover:underline"
			href="https://www.wir-machen-druck.de/speisekarte-din-a5-148-cm-x-210-cm-beidseitig-bedruckt.html"
			target="_blank"
		>
			WIRmachenDRUCK
		</a>
		<br />
		Datenformat: 154x216mm, Beschnitt: 3mm, Sicherheitsabstand: 6mm
	</div>
</div>
