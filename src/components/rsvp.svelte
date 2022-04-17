<script lang="ts">
	import type { Details, Invitation } from '../types';
	import StatusIndicator from './status-indicator.svelte';

	export let invitation: Invitation;
	export let details: Details;

	$: deadline = new Date(details?.deadline || null);
	$: disabled = new Date().getTime() > deadline.getTime();

	$: acceptedPersons = invitation?.members?.filter((m) => m.accepted) || [];
	let status = 'none';

	$: showModal = false;

	function declineInvitation() {
		invitation?.members?.forEach((m) => (m.accepted = false));
		updateInvitation();
	}

	function acceptInvitation() {
		invitation?.members?.forEach((m) => (m.accepted = true));
		if (invitation?.members?.length > 1) {
			showModal = true;
		} else {
			updateInvitation();
		}
	}

	function updateInvitation() {
		status = 'pending';
		for (const member of invitation.members) {
			if (member.accepted === null) {
				member.accepted = false;
			}
		}
		fetch(`/${invitation?._id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(invitation)
		}).then((response) => {
			if (response.status === 200) {
				status = 'success';
				showModal = false;
			} else {
				status = 'error';
				alert('Fehler beim Speichern der Einladung\n' + response.statusText);
			}
		});
	}
</script>

<div id="rsvp" class="relative min-h-screen snap-start">
	<div
		class="container mx-auto flex min-h-screen flex-col items-center justify-center gap-2 p-6 md:gap-6"
	>
		<h1 class="my-2 max-w-full break-words text-center font-display text-4xl md:my-4 md:text-6xl">
			{invitation?.salutation || ''}
		</h1>
		{#each details?.text || [] as line}
			<p class="text-center font-body text-lg md:text-xl lg:text-2xl">
				{line}
			</p>
		{/each}
		<div class="mt-4 flex gap-6 font-body">
			<button
				on:click={() => acceptInvitation()}
				{disabled}
				class="relative border-0 bg-black px-4 py-2 text-xl text-white ring-black ring-offset-2 ring-offset-white transition hover:bg-green-600 focus:ring-2"
			>
				Teilnahme zusagen
				<div class="absolute right-0 top-1/2 mr-2 -translate-y-1/2">
					<StatusIndicator {status} />
				</div>
			</button>
			<button
				on:click={() => declineInvitation()}
				{disabled}
				class="relative border-2 border-black py-2 px-4 text-xl ring-black ring-offset-2 ring-offset-white transition hover:border-red-600 hover:bg-red-600 hover:text-white focus:ring-2"
			>
				Teilnahme absagen
				<div class="absolute right-0 top-1/2 mr-2 -translate-y-1/2">
					<StatusIndicator {status} />
				</div>
			</button>
		</div>
	</div>
</div>
{#if showModal}
	<div class="fixed inset-0 h-screen w-screen font-body">
		<div class="flex h-full items-center justify-center bg-black/50">
			<div class="flex w-[32rem] max-w-[32rem] flex-col gap-2 border-2 border-black bg-white p-8">
				{#each invitation?.members || [] as member}
					<label class="inline-flex items-center">
						<input
							type="checkbox"
							bind:checked={member.accepted}
							class="h-5 w-5 border-transparent bg-gray-300 text-red-600 transition hover:text-red-700 focus:border-transparent focus:bg-gray-300 focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-white"
						/>
						<span class="ml-2 max-w-full break-words text-2xl text-gray-900">{member.name}</span>
					</label>
				{/each}
				<button
					on:click={() => updateInvitation()}
					class="relative mt-4 border-0 bg-black py-2 px-4 text-xl text-white ring-black ring-offset-2 ring-offset-white transition hover:bg-black/75 focus:ring-2"
				>
					Zusagen
					<div class="absolute right-0 top-1/2 mr-2 -translate-y-1/2">
						<StatusIndicator {status} />
					</div>
				</button>
			</div>
		</div>
	</div>
{/if}
