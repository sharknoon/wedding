<script lang="ts">
	const heading = 'Liebe Familie Klosterhuber';
	const invitation =
		'Nun ist es soweit: Wir werden heiraten! Ihr seid ganz herzlich eingeladen, diesen besonderen Moment mit uns zu feiern. Ihr dürft singen, Reden schwingen und Tanzen so lange es Euch gefällt! Es gibt zu essen und zu trinken und Ihr könnt gerne anziehen, worin Ihr Euch wohlfühlt. Wer dort übernachten möchte, der wendet sich bitte an die Pfrondorfer Mühle. Wer uns etwas zur Hochzeit schenken möchte: Wir freuen uns über eine Finanzspritze für unsere Flitterwochen auf [tolle insel hier einfügen]. Meldet Euch bitte bis zu diesem Tag bei uns, damit wir wissen, ob Ihr kommt.';
	const deadline = new Date('2023-03-23T15:00:00+02:00');
	const invitationMembers = ['Max Mustermann', 'Erika Musterfrau', 'Karin Musterkind'];

	const disabled = new Date().getTime() > deadline.getTime();
</script>

<div id="rsvp" class="bg-yellow-100 min-h-screen max-h-screen relative font-body">
	<div
		class="container mx-auto min-h-screen max-h-screen flex items-center flex-col justify-center gap-6"
	>
		<h1 class="font-display text-6xl text-center">{heading}</h1>
		<p class="mt-4">
			{invitation}
		</p>
		<span class="font-display text-4xl">
			{deadline.toLocaleDateString(undefined, {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric'
			})}
		</span>

		<div
			class="{disabled
				? 'opacity-50'
				: ''} border-2 border-yellow-700 rounded-xl bg-gray-100 w-10/12 sm:w-8/12 xl:w-4/12 p-8 flex flex-col gap-4 relative"
		>
			{#each invitationMembers as member}
				<label
					class="{invitationMembers.length <= 1 ? 'hidden' : ''} {disabled
						? 'cursor-default'
						: 'cursor-pointer'} inline-flex items-center"
				>
					<input
						type="checkbox"
						checked
						{disabled}
						class="rounded bg-gray-200 border-transparent focus:border-transparent focus:bg-gray-200 text-yellow-600 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-yellow-600"
					/>
					<span class="ml-2">{member}</span>
				</label>
			{/each}
			<button
				{disabled}
				class="{disabled
					? 'cursor-default'
					: ''} p-2 rounded bg-yellow-600 border-2 border-yellow-600 text-white focus:ring-2 ring-offset-2 ring-offset-gray-100 ring-yellow-600"
			>
				Zusagen
			</button>
			<hr class="border-t-2 border-yellow-600 h-[2px]" />
			<button
				{disabled}
				class="{disabled
					? 'cursor-default'
					: ''} p-2 rounded bg-gray-100 border-2 border-yellow-600 focus:ring-2 ring-offset-2 ring-offset-gray-100 ring-yellow-600"
			>
				Absagen
			</button>
			{#if disabled}
				<h1
					class="absolute bottom-1/2 transform translate-y-1/2 font-body text-gray-800 text-3xl md:text-4xl text-center self-center"
				>
					Anmeldefrist abgeloffen
				</h1>
			{/if}
		</div>
	</div>
</div>
