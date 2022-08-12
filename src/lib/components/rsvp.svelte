<script lang="ts">
	import { SendStatus, type Details, type Invitation } from '$lib/types';
	import { fade, scale } from 'svelte/transition';
	import StatusIndicator from './status-indicator.svelte';

	export let invitation: Invitation;
	export let details: Details;

	$: deadline = new Date(details?.deadline);
	$: disabled = new Date().getTime() > deadline.getTime();

	let acceptStatus: SendStatus = SendStatus.NONE;
	$: if (acceptStatus === SendStatus.SUCCESS) {
		setTimeout(() => {
			acceptStatus = SendStatus.NONE;
		}, 4000);
	}
	let declineStatus: SendStatus = SendStatus.NONE;
	$: if (declineStatus === SendStatus.SUCCESS) {
		setTimeout(() => {
			declineStatus = SendStatus.NONE;
		}, 4000);
	}
	let showModal = false;

	function declineInvitation() {
		invitation?.members?.forEach((m) => (m.accepted = 'false'));
		invitation = invitation;
		updateInvitation(false);
	}

	function acceptInvitation() {
		invitation?.members?.forEach((m) => (m.accepted = 'true'));
		invitation = invitation;
		if (invitation?.members?.length > 1) {
			showModal = true;
		} else {
			updateInvitation(true);
		}
	}

	function updateInvitation(accepted: boolean) {
		if (accepted) acceptStatus = SendStatus.PENDING;
		else declineStatus = SendStatus.PENDING;
		for (const member of invitation.members) {
			if (member.accepted !== 'true' && member.accepted !== 'false') {
				member.accepted = 'false';
			}
		}
		invitation = invitation;
		fetch(`/${invitation?._id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(invitation)
		}).then((response) => {
			if (response.status === 200) {
				if (accepted) acceptStatus = SendStatus.SUCCESS;
				else declineStatus = SendStatus.SUCCESS;
				showModal = false;
			} else {
				if (accepted) acceptStatus = SendStatus.ERROR;
				else declineStatus = SendStatus.ERROR;
				alert('Fehler beim Speichern der Einladung\n' + response.statusText);
			}
		});
	}
</script>

<div id="rsvp" class="relative min-h-full snap-start">
	<div
		class="container absolute inset-0 mx-auto flex flex-col items-center justify-center gap-2 p-6 md:gap-6"
	>
		<h1
			class="my-2 max-w-full break-words text-center font-cheap-pine text-4xl md:my-4 md:text-6xl"
		>
			{invitation?.salutation || ''}
		</h1>
		{#each details?.text || [] as line}
			<p class="text-center font-oswald text-lg md:text-xl lg:text-2xl">
				{line}
			</p>
		{/each}
		<div class="mt-4 flex gap-6 font-oswald">
			<button
				on:click={() => acceptInvitation()}
				{disabled}
				class="relative border-0 bg-black px-4 py-2 text-xl text-white ring-black ring-offset-2 ring-offset-white transition hover:bg-green-600 focus:ring-2"
			>
				Teilnahme zusagen
				<div
					class="absolute inset-0 h-full w-full transition-all {acceptStatus !== SendStatus.NONE
						? 'bg-black/75 text-white'
						: ''}"
				>
					<div class="flex h-full items-center justify-center">
						<StatusIndicator status={acceptStatus} />
					</div>
				</div>
			</button>
			<button
				on:click={() => declineInvitation()}
				{disabled}
				class="relative border-2 border-black py-2 px-4 text-xl ring-black ring-offset-2 ring-offset-white transition hover:border-red-600 hover:bg-red-600 hover:text-white focus:ring-2"
			>
				Teilnahme absagen
				<div
					class="absolute inset-0 h-full w-full transition-all {declineStatus !== SendStatus.NONE
						? 'bg-black/75 text-white'
						: ''}"
				>
					<div class="flex h-full items-center justify-center">
						<StatusIndicator status={declineStatus} />
					</div>
				</div>
			</button>
		</div>
		<div class="mx-auto font-oswald text-xl">
			{#if invitation?.members?.every((m) => m.accepted === 'true')}
				Wir freuen uns auf Euer Kommen!
			{:else if invitation?.members?.some((m) => m.accepted === 'true')}
				Schade, dass Ihr nicht alle kommen könnt, aber wir freuen uns auf Euer Kommen!
			{:else if invitation?.members?.every((m) => m.accepted === 'false')}
				Schade, dass Ihr nicht kommen könnt.
			{/if}
		</div>
	</div>
</div>
{#if showModal}
	<div
		class="fixed inset-0 h-screen w-screen font-oswald"
		transition:fade
		on:click|stopPropagation={() => (showModal = false)}
	>
		<div class="flex h-full items-center justify-center bg-black/50">
			<div
				on:click|stopPropagation
				transition:scale
				class="m-4 flex w-[32rem] max-w-[32rem] flex-col gap-2 border-4 border-black bg-white p-8"
			>
				{#each invitation?.members || [] as member}
					<label class="inline-flex items-center">
						<input
							type="checkbox"
							checked={member.accepted === 'true'}
							on:change={(e) => (member.accepted = String(e.currentTarget.checked))}
							class="h-5 w-5 border-transparent bg-gray-300 text-red-600 transition hover:text-red-700 focus:border-transparent focus:bg-gray-300 focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-white"
						/>
						<span class="ml-2 max-w-full break-words text-2xl text-gray-900">{member.name}</span>
					</label>
				{/each}
				<button
					on:click={() => updateInvitation(true)}
					class="relative mt-4 border-0 bg-black py-2 px-4 text-xl text-white ring-black ring-offset-2 ring-offset-white transition hover:bg-black/75 focus:ring-2"
				>
					Zusagen
					<div
						class="absolute inset-0 h-full w-full transition-all {acceptStatus !== SendStatus.NONE
							? 'bg-black/75 text-white'
							: ''}"
					>
						<div class="flex h-full items-center justify-center">
							<StatusIndicator status={acceptStatus} />
						</div>
					</div>
				</button>
			</div>
		</div>
	</div>
{/if}
