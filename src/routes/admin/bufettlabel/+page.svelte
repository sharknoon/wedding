<script lang="ts">
	import DownloadButton from '../download-button.svelte';

	let downloadables: HTMLElement[] = [];

	const foods = [
		{ title: 'Gebratene Rinderrückensteaks', description: '' },
		{ title: 'Medaillons vom Schweinefilet', description: '' },
		{ title: 'Gebratene Tranches vom Lachs', description: 'mit frischen Kräutern und Zitrone' },
		{ title: 'Panierte Schnitzel', description: 'von der Putenbrust' },
		{ title: 'Schwäbische Butterstpätzle', description: '' },
		{
			title: 'Gebackene Kartoffelkrapfen',
			description: ''
		},
		{ title: 'Glasiertes Sommergemüse', description: '' },
		{ title: 'Zweierlei vom Grünkern', description: '' },
		{
			title: 'Cremiges Risotto und gebackene Falafel',
			description: 'glasiertem Sommergemüse mit Parmesanspänen'
		},
		{ title: 'Schoko-Banane-Stracciatella', description: 'Torte' },
		{ title: 'Brownie-Cheesecake', description: 'Torte' },
		{ title: 'Macarons', description: 'Nutella, Vanille, Frucht' }
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
						<span class="text-red-600">{food.title.substring(0, 1)}</span>{food.title.substring(
							1,
							food.title.length - 1
						)}<span class="text-red-600"
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
