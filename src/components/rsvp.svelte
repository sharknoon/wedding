<script lang="ts">
	import type { Invitation } from '../types';
	export let invitation: Invitation;

	const body =
		'Nun ist es soweit: Wir werden heiraten! Ihr seid ganz herzlich eingeladen, diesen besonderen Moment mit uns zu feiern. Ihr dürft singen, Reden schwingen und Tanzen so lange es Euch gefällt! Es gibt zu essen und zu trinken und Ihr könnt gerne anziehen, worin Ihr Euch wohlfühlt. Wer dort übernachten möchte, der wendet sich bitte an die Pfrondorfer Mühle. Wer uns etwas zur Hochzeit schenken möchte: Wir freuen uns über eine Finanzspritze für unsere Flitterwochen auf [tolle insel hier einfügen]. Meldet Euch bitte bis zu diesem Tag bei uns, damit wir wissen, ob Ihr kommt.';
	const deadline = new Date('2023-03-23T15:00:00+02:00');
	const disabled = new Date().getTime() > deadline.getTime();

	$: acceptedPersons = invitation?.members?.filter((m) => m.accepted) || [];

	function updateMembers() {
		fetch(`https://midrene-und-josua.de/api/invitation/${invitation?._id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(invitation?.members)
		}).then((response) => {
			console.log(response);
		});
	}
</script>

<div id="rsvp" class="bg-yellow-100 min-h-screen relative font-body">
	<div
		class="container mx-auto min-h-screen flex items-center flex-col justify-center gap-2 md:gap-6"
	>
		<h1 class="font-display text-4xl md:text-6xl text-center break-words max-w-full mt-4">
			{invitation?.salutation || ''}
		</h1>
		<p class="text-sm md:text-base m-2 md:mt-4">
			{body}
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
				: ''} border-2 border-yellow-600 rounded-xl max-w-full bg-gray-100 md:w-10/12 lg:w-7/12 xl:w-5/12 p-4 md:p-8 m-2 flex flex-col gap-4 relative"
		>
			{#each invitation?.members || [] as member}
				{#if invitation?.members.length > 1}
					<label class="{disabled ? 'cursor-default' : 'cursor-pointer'} inline-flex items-center">
						<input
							type="checkbox"
							bind:checked={member.accepted}
							{disabled}
							class="rounded bg-gray-200 border-transparent focus:border-transparent focus:bg-gray-200 text-yellow-600 hover:text-yellow-700 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-yellow-600 transition"
						/>
						<span class="ml-2 max-w-full break-words">{member.name}</span>
					</label>
				{/if}
			{/each}
			<button
				on:click={() => updateMembers()}
				{disabled}
				class="{disabled
					? 'cursor-default'
					: ''} p-2 rounded bg-yellow-600 hover:bg-yellow-700 border-2 border-yellow-600 hover:border-yellow-700 text-white focus:ring-2 ring-offset-2 ring-offset-gray-100 ring-yellow-600 transition"
			>
				{#if acceptedPersons.length > 0}
					{acceptedPersons.length} Person{acceptedPersons.length !== 1 ? 'en' : ''} zusagen
				{:else}
					Teilnahme absagen
				{/if}
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

<style lang="postcss">
	span {
		@apply break-words;
	}
</style>
