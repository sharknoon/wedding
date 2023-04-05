<script lang="ts">
	import DownloadButton from '../download-button.svelte';

	const downloadables: HTMLElement[] = [];

	const members: string[] = ['bla', 'test'];
</script>

<div class="flex flex-col items-center gap-16">
	<DownloadButton {downloadables} scale={4} />
	{#each members as member}
		<div
			class="h-[216mm] w-[111mm] max-w-[111mm] bg-white p-[6mm] shadow-2xl"
			id="tableassignments"
			bind:this={downloadables[0]}
		>
			<div class="flex h-full flex-col border-4 border-dashed border-black p-6 text-center">
				<h1 class="col-span-3 m-3 font-cheap-pine text-6xl">Reserviert</h1>
				<div class="my-6 flex flex-col justify-between">test</div>
			</div>
		</div>
	{/each}

	<div class="text-center">
		105x210mm, Flyer DIN lang - Topseller, einseitig bedruckt, 400g Papier, <a
			class="hover:underline"
			href="https://www.wir-machen-druck.de/flyer-din-lang-105-cm-x-210-cm-topseller-einseitig-bedruckt.html"
			target="_blank"
			rel="noreferrer"
		>
			WIRmachenDRUCK
		</a>
		<br />
		Datenformat: 111x216mm, Beschnitt: 3mm, Sicherheitsabstand: 3mm
	</div>
</div>
