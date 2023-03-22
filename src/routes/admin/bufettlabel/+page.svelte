<script lang="ts">
	import DownloadButton from '../download-button.svelte';

	let downloadables: HTMLElement[] = [];

	const foods = [
		{ title: 'Tomaten-Basilikumsuppe', description: 'mit Gin-Sahne und Croûtons' },
		{ title: 'Karottensalat', description: '' },
		{ title: 'Krautsalat', description: '' },
		{ title: 'Gurkensalat', description: '' },
		{ title: 'Kartoffelsalat', description: '' },
		{ title: 'Rinderrücken', description: 'Steak oder im Ganzen gebraten' },
		{ title: 'Gebratenes Lachsfilet', description: 'mit Kräutern' },
		{
			title: 'Risotto und Falaffel von Grünkern',
			description: 'mit mediterranem Gemüse und Parmesanspänen'
		},
		{ title: 'Schwäbische Butterstpätzle', description: '' },
		{ title: 'Pommes Frites', description: '' },
		{ title: 'Nutella-, Vanille- und Fruchtmacarons', description: '' },
		{ title: 'Schoko-Banane-Stracciatella', description: 'obere Torte' },
		{ title: 'Brownie-Cheesecake', description: 'untere Torte' }
	];
</script>

<div class="flex flex-col items-center gap-16">
	<DownloadButton {downloadables} />
	{#each foods as food, i}
		<div
			class="h-[40mm] max-h-[40mm] w-[60mm] bg-white p-[3mm] shadow-2xl"
			id="bufettlabel-{i}"
			bind:this={downloadables[i]}
		>
			<div class="flex h-full flex-col justify-center border-2 border-dashed border-gray-900">
				<div class="text-center">
					<div class="font-cheap-pine-sans text-3xl first-letter:text-red-600">
						{food.title.substring(0, food.title.length - 1)}<span class="text-red-600"
							>{food.title.substring(food.title.length - 1, food.title.length)}</span
						>
					</div>
					<div class="font-oswald text-lg">{food.description}</div>
				</div>
			</div>
		</div>
	{/each}

	<div class="text-center">40x60mm, Selbstdruck</div>
</div>
