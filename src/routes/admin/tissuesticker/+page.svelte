<script lang="ts">
	import DownloadButton from '../download-button.svelte';

	let downloadables: HTMLElement[] = [];
</script>

<div class="flex flex-col items-center gap-16">
	<DownloadButton {downloadables} />
	<div
		class="h-[51mm] w-[51mm] max-w-[51mm] bg-white p-[7mm] shadow-2xl "
		id="tissuesticker"
		bind:this={downloadables[0]}
	>
		<div class="grid h-full grid-cols-2">
			<div
				style="background-image: url('/images/people/midrene-and-josua-large.avif')"
				class="row-span-2 flex flex-col justify-between bg-cover bg-center bg-no-repeat text-center font-cheap-pine-sans text-2xl text-white"
			>
				<div>23. Sept.</div>
				<div>2023</div>
			</div>
			<div
				class="flex flex-col justify-between text-center font-cheap-pine-sans text-xl uppercase tracking-widest"
			>
				<div>Josua</div>
				<div class="text-2xl">Freuden</div>
			</div>
			<div
				class="flex flex-col justify-between bg-black text-center font-cheap-pine-sans text-xl uppercase tracking-widest text-white"
			>
				<div class="text-2xl">Tränen</div>
				<div>Midrène</div>
			</div>
		</div>
	</div>

	<div class="text-center">
		45x45mm, Hochwertige Flaschenetiketten auf Rolle mit freier Größe (rechteckig), Haftpapier weiß, <a
			class="hover:underline"
			href="https://www.wir-machen-druck.de/hochwertige-flaschenetiketten-auf-rolle-mit-freier-groesse-rechteckig.html"
			target="_blank"
			rel="noreferrer"
		>
			WIRmachenDRUCK
		</a>
		<br />
		Datenformat: 51x51mm, Beschnitt: 3mm, Sicherheitsabstand: 3mm
	</div>
</div>
