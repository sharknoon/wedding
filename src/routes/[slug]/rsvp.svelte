<script lang="ts">
	import { invitation } from '$lib/client/stores';
	import { fade, scale } from 'svelte/transition';

	type State = 'declined' | 'partly accepted' | 'completly accepted' | 'unknown';
	let state: State = 'unknown';

	$: {
		if ($invitation.members.every((m) => m.accepted === 'unknown')) {
			state = 'unknown';
		} else if ($invitation.members.every((m) => m.accepted === 'true')) {
			state = 'completly accepted';
		} else if ($invitation.members.every((m) => m.accepted === 'false')) {
			state = 'declined';
		} else if ($invitation.members.some((m) => m.accepted === 'true')) {
			state = 'partly accepted';
		} else {
			state = 'unknown';
		}
	}

	let workingInvitation = $invitation;

	let showModal = false;

	function declineInvitation() {
		workingInvitation?.members?.forEach((m) => (m.accepted = 'false'));
		updateInvitation();
	}

	function acceptInvitation() {
		workingInvitation?.members?.forEach((m) => (m.accepted = 'true'));
		showModal = true;
	}

	function updateInvitation() {
		// Need to add the diet if you plan to attend
		if (
			workingInvitation.members.some(
				(m) => m.accepted === 'true' && (m.diet === 'unknown' || !m.diet)
			)
		) {
			alert('Bitte gebt auch eure Ernährungsform an.');
			return;
		}
		for (const member of workingInvitation.members) {
			if (member.accepted !== 'true' && member.accepted !== 'false') {
				member.accepted = 'false';
			}
		}
		fetch(`/api/invitations/${workingInvitation._id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(workingInvitation)
		}).then(async (response) => {
			if (response.status === 200) {
				showModal = false;
				$invitation = workingInvitation;
			} else {
				alert(
					`Fehler beim Speichern der Einladung\n${response.statusText} ${await response.text()}`
				);
			}
		});
	}
</script>

<div class="bg-white p-2 md:fixed md:bottom-0 md:right-0">
	<div class="flex gap-2 font-oswald">
		{#if state === 'unknown'}
			<button
				on:click={() => acceptInvitation()}
				class="relative grow border-0 bg-green-600 px-4 py-2 text-xl text-white ring-black ring-offset-2 ring-offset-white transition hover:bg-green-700 focus:ring-2"
			>
				Zusagen
			</button>
			<button
				on:click={() => declineInvitation()}
				class="relative grow border-0 bg-red-600 py-2 px-4 text-xl text-white ring-black ring-offset-2 ring-offset-white transition hover:bg-red-700 hover:text-white focus:ring-2"
			>
				Absagen
			</button>
		{:else if state === 'completly accepted' || state === 'partly accepted'}
			<div class="flex items-center gap-2 text-xl">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 text-green-600"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
				</svg>
				{#if state === 'completly accepted'}
					Zugesagt
				{:else}
					{$invitation.members.filter((m) => m.accepted === 'true').length} Personen zugesagt
				{/if}
			</div>
			<button
				on:click={() => acceptInvitation()}
				class="relative grow border-0 bg-black py-2 px-4 text-xl text-white ring-black ring-offset-2 ring-offset-white transition hover:bg-black/75 focus:ring-2"
			>
				Teilnahme ändern
			</button>
			<button
				on:click={() => declineInvitation()}
				class="relative grow border-0 bg-red-600 py-2 px-4 text-xl text-white ring-black ring-offset-2 ring-offset-white transition hover:bg-red-700 hover:text-white focus:ring-2"
			>
				Absagen
			</button>
		{:else if state === 'declined'}
			<button
				on:click={() => acceptInvitation()}
				class="relative grow border-0 bg-green-600 px-4 py-2 text-xl text-white ring-black ring-offset-2 ring-offset-white transition hover:bg-green-700 focus:ring-2"
			>
				Doch noch zusagen
			</button>
			<div class="flex items-center gap-2 text-xl">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 text-red-600"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
				</svg>
				Abgesagt
			</div>
		{/if}
	</div>
</div>
{#if showModal}
	<div
		class="fixed inset-0 flex items-center justify-center bg-black/50 font-oswald"
		transition:fade
		on:click|stopPropagation={(e) => {
			if (e.target === e.currentTarget) {
				showModal = false;
			}
		}}
		on:keypress={(e) => {
			if (e.code === 'Escape') {
				showModal = false;
			}
		}}
	>
		<div
			transition:scale
			class="grid max-h-screen w-[32rem] max-w-[32rem] grid-cols-[auto_auto] flex-col gap-2 overflow-auto border-2 border-black bg-white p-3 text-xl"
		>
			{#if workingInvitation.members.length > 1}
				<div class="flex h-full items-center">Es kommen</div>
				<div class="flex">
					<div class="flex flex-col">
						{#each workingInvitation.members as member, index}
							<div>
								<input
									type="checkbox"
									id={'rsvp-' + index}
									checked={member.accepted === 'true'}
									class="h-5 w-5 border-transparent bg-gray-300 text-black transition hover:text-black focus:border-transparent focus:bg-gray-300 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white"
									on:change={(e) => (member.accepted = e.currentTarget.checked ? 'true' : 'false')}
								/>
								<label for={'rsvp-' + index}>{member.name}</label>
							</div>
						{/each}
					</div>
				</div>
			{/if}
			{#each workingInvitation.members as member}
				<span>
					{#if workingInvitation.members.length > 1}
						{member.name.split(' ')[0]} isst
					{:else}
						Ich esse
					{/if}
				</span>
				<select class="w-48 border-2 border-black p-1 text-xl" bind:value={member.diet}>
					<option value="unknown" hidden>Bitte auswählen</option>
					<option value="omnivorian">omnivorisch (Alles)</option>
					<option value="pescetarian">pescetarisch (Fisch)</option>
					<option value="vegetarian">vegetarisch</option>
					<option value="vegan">vegan</option>
				</select>
			{/each}

			<span>Allergien</span>
			<textarea
				rows="2"
				placeholder="Max hat eine Nussallergie"
				class="border-2 border-black"
				bind:value={workingInvitation.allergies}
			/>

			<button
				on:click={() => updateInvitation()}
				class="relative col-span-2 mt-4 border-0 bg-black py-2 px-4 text-xl text-white ring-black ring-offset-2 ring-offset-white transition hover:bg-black/75 focus:ring-2"
			>
				{#if workingInvitation.members.every((m) => m.accepted === 'false')}
					Absagen
				{:else}
					Zusagen
				{/if}
			</button>
		</div>
	</div>
{/if}
