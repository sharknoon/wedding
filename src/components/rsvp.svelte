<script lang="ts">
	const deadline = new Date('2023-03-23T15:00:00+02:00');
	//const invitationCategory = 'family'; //Can be 'family', 'single',
	const invitationMembers = ['Max Mustermann', 'Erika Musterfrau', 'Karin Musterkind'];

	const disabled = true; //new Date().getTime() > deadline.getTime();
</script>

<div id="rsvp" class="bg-yellow-100 min-h-screen max-h-screen relative font-body">
	<div class="p-8 container mx-auto min-h-screen max-h-screen flex items-center flex-col">
		<h1 class="font-display text-6xl w-full">Liebe Familie Musterfamilie</h1>
		<p class="mt-4">
			Bla bla bli bla blub Ihr seid eingeladen, bla bla Datum Uhrzeit bla bla Möchtet ihr kommen bla
			bla bitte rechtzeitig bescheid geben bla bla blub danke bla bla blub
		</p>
		<span class="font-display text-4xl">
			{deadline.toLocaleDateString(undefined, {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric'
			})}
		</span>
	</div>

	<div class="absolute bottom-12 w-10/12 sm:w-8/12 xl:w-4/12">
		<div
			class="{disabled
				? 'opacity-50'
				: ''} border-2 border-yellow-700 rounded-xl bg-gray-100 p-8 flex flex-col gap-4 relative"
		>
			{#each invitationMembers as member}
				<label class="{invitationMembers.length <= 1 ? 'hidden' : ''} inline-flex items-center">
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
				class="p-2 rounded bg-yellow-600 border-2 border-yellow-600 text-white focus:ring-2 ring-offset-2 ring-offset-gray-100 ring-yellow-600"
			>
				Zusagen
			</button>
			<hr class="border-t-2 border-yellow-600 h-[2px]" />
			<button
				{disabled}
				class="p-2 rounded bg-gray-100 border-2 border-yellow-600 focus:ring-2 ring-offset-2 ring-offset-gray-100 ring-yellow-600"
			>
				Absagen
			</button>
			{#if disabled}
				<h1
					class="absolute bottom-1/2 left-0 transform translate-y-1/2 font-body text-4xl text-center w-full filter drop-shadow-lg"
				>
					Anmeldefrist abgeloffen
				</h1>
			{/if}
		</div>
	</div>
</div>
