<script lang="ts">
	import { invitations } from '$lib/client/stores';
	import DownloadButton from '../download-button.svelte';

	let downloadables: HTMLElement[] = [];
</script>

<div class="flex flex-col items-center gap-16">
	<DownloadButton {downloadables} scale={4} />
	<div
		class="h-[426mm] w-[600mm] max-w-[600mm] bg-white p-[9mm] shadow-2xl "
		id="tableassignments"
		bind:this={downloadables[0]}
	>
		<div class="grid h-full grid-cols-3 border-4 border-dashed border-black p-6 text-center">
			<h1 class="col-span-3 font-cheap-pine text-8xl">Sitzplan</h1>

			{#each [1, 2, 3, 4, 5, 6] as table}
				<div class="flex flex-col gap-3">
					<h2 class="font-cheap-pine-sans text-6xl text-red-600">Tisch {table}</h2>
					{#each $invitations as invitation}
						{#each invitation.members.filter((m) => m.table === table && m.accepted === 'true') as member}
							<div class="font-oswald text-4xl">{member.name}</div>
						{/each}
					{/each}
				</div>
			{/each}
		</div>
	</div>

	<div class="text-center">
		594x420mm, Plakat DIN A2 quer einseitig 4/0-farbig bedruckt, 250g Papier, <a
			class="hover:underline"
			href="https://www.wir-machen-druck.de/plakat-din-a2-quer-594-x-420-mm-einseitig-40farbig-bedruckt-topseller.html"
			target="_blank"
		>
			WIRmachenDRUCK
		</a>
		<br />
		Datenformat: 600x426mm, Beschnitt: 3mm, Sicherheitsabstand: 6mm
	</div>
</div>
