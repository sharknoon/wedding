<script lang="ts">
	import { invitations } from '$lib/client/stores';
	import DownloadButton from '../download-button.svelte';

	const downloadables: HTMLElement[] = [];

	const members = $invitations.flatMap((i) => i.members);
	const tables = [...new Set(members.map((m) => m.table))].sort().filter((t) => t > 0);

	const namesCount = new Map<string, { names: string[]; count: number }>();
	members.forEach((m) => {
		const firstName = m.name.split(' ')[0];

		const nameCount = namesCount.get(firstName);
		if (nameCount) {
			nameCount.count += 1;
			nameCount.names.push(m.name);
		} else {
			namesCount.set(firstName, { names: [m.name], count: 1 });
		}
	});

	function generateLastNameForDuplicates(lastName: string, lastNames: string[]): string {
		console.log(lastName, lastNames);
		for (let index = 0; index < lastName.length; index++) {
			const chars = lastName.substring(0, index + 1);
			console.log(lastNames.some((n) => n.substring(0, index + 1) === chars));
			if (lastNames.some((n) => n.substring(0, index + 1) === chars)) continue;
			else return lastName.substring(0, index + 1) + '.';
		}
		return lastName;
	}
</script>

<div class="flex flex-col items-center gap-16">
	<DownloadButton {downloadables} scale={4} />
	{#each tables as table, i}
		{@const tableMembers = members.filter((m) => m.table === table)}
		<div
			class="h-[216mm] w-[111mm] max-w-[111mm] bg-white p-[6mm] shadow-2xl"
			id="tableassignments-{table}"
			bind:this={downloadables[i]}
		>
			<div class="flex h-full flex-col border-4 border-dashed border-black p-6 text-center">
				<h1 class="col-span-3 m-3 font-cheap-pine text-6xl">
					{#if table === 1}
						Brauttisch
					{:else}
						Tisch <span class="text-red-600">{table}</span>
					{/if}
				</h1>
				<div
					class="my-6 flex flex-col justify-between"
					style="height: {tableMembers.length * 3.333}rem;"
				>
					{#each tableMembers as member}
						{@const firstName = member.name.split(' ')[0]}
						<div
							class="font-oswald text-2xl {member.name.startsWith('Midrène') ||
							member.name.startsWith('Josua')
								? 'text-red-600'
								: ''}"
						>
							{firstName}
							{#if (namesCount.get(firstName)?.count ?? 1) > 1}
								{@const lastName = member.name.split(' ')[1]}
								{generateLastNameForDuplicates(
									lastName,
									members
										.filter((m) => m.name.split(' ')[0] === firstName)
										.filter((m) => m.name !== member.name)
										.map((m) => m.name.split(' ')[1])
								)}
							{/if}
						</div>
					{/each}
				</div>
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
