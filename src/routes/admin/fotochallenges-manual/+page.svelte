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
		class="h-[297mm] max-h-[297mm] w-[210mm] gap-[6mm] bg-white p-[6mm] shadow-2xl"
		id="fotochallenges-manual"
		bind:this={downloadables[0]}
	>
		<div class="flex h-full max-h-full flex-col border-2 border-dashed border-gray-900 p-3">
			<Header title="Fotochallenges" />
			<Divider />
			<div
				class="flex grow flex-col items-center justify-center gap-2 p-3 text-center font-oswald text-2xl"
			>
				<div class="font-cheap-pine-sans text-4xl">
					<span class="text-red-600">1.</span> Challenge freirubbeln
				</div>
				<div class="mb-4">Rubbelt mit den Münzen die Challenge auf der Karte frei.</div>
				<div class="font-cheap-pine-sans text-4xl">
					<span class="text-red-600">2.</span> Challenge erfüllen
				</div>
				<div class="mb-4">
					Macht mit der Fotobox ein paar coole Fotos, die der Challenge entsprechen.
				</div>
				<div class="font-cheap-pine-sans text-4xl">
					<span class="text-red-600">3.</span> Ins Gästebuch kleben
				</div>
				<div class="mb-4">
					Klebt euer ausgedrucktes Bild und die Aufgabenkarte ins Gästebuch und schreibt etwas dazu.
					Gerne könnt ihr auch noch weitere Bilder für euch machen.
				</div>
				<div class="font-cheap-pine-sans text-4xl">
					<span class="text-red-600">4.</span> Weitersagen!
				</div>
				<div>Helft mit und sagt den anderen Gästen Bescheid, ihre Fotochallenges zu erfüllen.</div>
			</div>
			<Divider direction="up" />
			<Footer />
		</div>
	</div>

	<div class="text-center">DIN A4, laminiert, Selbstdruck</div>
</div>
