<script lang="ts">
	import DownloadButton from '../download-button.svelte';

	let downloadables: HTMLElement[] = [];
</script>

<div class="flex flex-col items-center gap-16">
	<DownloadButton {downloadables} />
	<div
		class="h-[75mm] w-[75mm] max-w-[75mm] bg-white p-[6mm] shadow-2xl "
		id="guestgiftlabel-salt"
		bind:this={downloadables[0]}
	>
		<div class="grid h-full grid-cols-2">
			<div
				style="background-image: url('/images/people/midrene-and-josua-large.avif')"
				class="row-span-2 flex flex-col justify-between bg-cover bg-center bg-no-repeat text-center font-cheap-pine-sans text-2xl text-white"
			>
				<div>23. September</div>
				<div>2023</div>
			</div>
			<div
				class="flex flex-col justify-between text-center font-cheap-pine-sans text-xl uppercase tracking-widest"
			>
				<div>Josua</div>
				<div class="text-2xl">S a l z</div>
			</div>
			<div
				class="flex flex-col justify-between bg-black text-center font-cheap-pine-sans text-xl uppercase tracking-widest text-white"
			>
				<div class="text-2xl">B l a c k</div>
				<div>Midrène</div>
			</div>
		</div>
	</div>
	<div
		class="h-[75mm] w-[75mm] max-w-[75mm] bg-white p-[6mm] shadow-2xl "
		id="guestgiftlabel-pepper"
		bind:this={downloadables[1]}
	>
		<div class="grid h-full grid-cols-2">
			<div
				style="background-image: url('/images/people/midrene-and-josua-large.avif')"
				class="row-span-2 flex flex-col justify-between bg-cover bg-center bg-no-repeat text-center font-cheap-pine-sans text-2xl text-white"
			>
				<div>23. September</div>
				<div>2023</div>
			</div>
			<div
				class="flex flex-col justify-between text-center font-cheap-pine-sans text-xl uppercase tracking-widest"
			>
				<div>Josua</div>
				<div class="text-2xl">W h i t e</div>
			</div>
			<div
				class="flex flex-col justify-between bg-black text-center font-cheap-pine-sans text-xl uppercase tracking-widest text-white"
			>
				<div class="text-2xl">P f e f f e r</div>
				<div>Midrène</div>
			</div>
		</div>
	</div>

	<div class="text-center">
		69x69mm, Hochwertige Flaschenetiketten auf Rolle mit freier Größe (rechteckig), Haftpapier weiß, <a
			class="hover:underline"
			href="https://www.wir-machen-druck.de/hochwertige-flaschenetiketten-auf-rolle-mit-freier-groesse-rechteckig.html"
			target="_blank"
		>
			WIRmachenDRUCK
		</a>
		<br />
		Datenformat: 75x75mm, Beschnitt: 3mm, Sicherheitsabstand: 3mm
	</div>
</div>
