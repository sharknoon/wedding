<script lang="ts">
	import { SendStatus } from '$lib/types';
	import { invitation } from '$lib/client/stores';
	import { fade, scale } from 'svelte/transition';
	import StatusIndicator from './status-indicator.svelte';

	let showModal = false;
	let workingInvitation = $invitation;

	function declineInvitation() {
		$invitation?.members?.forEach((m) => (m.accepted = 'false'));
		updateInvitation();
	}

	function acceptInvitation() {
		$invitation?.members?.forEach((m) => (m.accepted = 'true'));
		showModal = true;
	}

	function updateInvitation() {
		for (const member of $invitation.members) {
			if (member.accepted !== 'true' && member.accepted !== 'false') {
				member.accepted = 'false';
			}
		}
		invitation.set($invitation);
		fetch(`/api/invitations/${$invitation?._id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify($invitation)
		}).then((response) => {
			if (response.status === 200) {
				showModal = false;
			} else {
				alert('Fehler beim Speichern der Einladung\n' + response.statusText);
			}
		});
	}
</script>

<div class="bg-white p-2 md:fixed md:bottom-0 md:right-0">
	<div class="flex gap-2 font-oswald">
		{#if $invitation.members.every((m) => m.accepted === 'unknown') || $invitation.members.every((m) => m.accepted === 'false')}
			<button
				on:click={() => acceptInvitation()}
				class="relative grow border-0 bg-green-600 px-4 py-2 text-xl text-white ring-black ring-offset-2 ring-offset-white transition focus:ring-2"
			>
				{#if $invitation.members.every((m) => m.accepted === 'unknown')}
					Zusagen
				{:else if $invitation.members.every((m) => m.accepted === 'false')}
					Doch noch zusagen
				{/if}
			</button>
		{:else}
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
				{#if $invitation.members.every((m) => m.accepted === 'true')}
					Zugesagt
				{:else}
					{$invitation.members.filter((m) => m.accepted === 'true').length} Personen zugesagt
				{/if}
			</div>
		{/if}
		{#if $invitation.members.some((m) => m.accepted === 'true')}
			<button
				on:click={() => acceptInvitation()}
				class="relative grow border-0 bg-black py-2 px-4 text-xl text-white ring-black ring-offset-2 ring-offset-white focus:ring-2"
			>
				Teilnahme ändern
			</button>
		{/if}
		{#if $invitation.members.every((m) => m.accepted === 'false')}
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
		{:else}
			<button
				on:click={() => declineInvitation()}
				class="relative grow border-0 bg-red-600 py-2 px-4 text-xl text-white ring-black ring-offset-2 ring-offset-white hover:text-white focus:ring-2"
			>
				Absagen
			</button>
		{/if}
	</div>
</div>
{#if showModal}
	<div
		class="fixed inset-0 h-screen w-screen max-w-[100vw] font-oswald"
		transition:fade
		on:click|stopPropagation={() => (showModal = false)}
	>
		<div class="flex h-full items-center justify-center bg-black/50">
			<div
				on:click|stopPropagation
				transition:scale
				class="grid max-h-screen w-[32rem] max-w-[32rem] grid-cols-[auto_auto] flex-col gap-2 overflow-scroll border-2 border-black bg-white p-3 text-xl"
			>
				{#if workingInvitation.members.length > 1}
					<div class="flex h-full items-center">Wir bringen</div>
					<div class="flex">
						<div class="flex flex-col">
							{#each workingInvitation.members as member, index}
								<div>
									<input
										type="checkbox"
										id={'rsvp-' + index}
										checked={member.accepted === 'true'}
										class="h-5 w-5 border-transparent bg-gray-300 text-black transition hover:text-black focus:border-transparent focus:bg-gray-300 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white"
										on:change={(e) =>
											(member.accepted = e.currentTarget.checked ? 'true' : 'false')}
									/>
									<label for={'rsvp-' + index}>{member.name}</label>
								</div>
							{/each}
						</div>
						<div class="ml-4 flex h-full items-center">mit</div>
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
					class="border-2 border-black focus:outline-none"
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
	</div>
{/if}
