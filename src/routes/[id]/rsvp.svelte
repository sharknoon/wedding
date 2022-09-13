<script lang="ts">
	import { SendStatus } from '$lib/types';
	import { invitation, details } from '$lib/stores';
	import { fade, scale } from 'svelte/transition';
	import StatusIndicator from './status-indicator.svelte';

	$: deadline = new Date($details?.deadline);
	$: disabled = new Date().getTime() > deadline.getTime();

	let acceptStatus: SendStatus = SendStatus.NONE;
	$: if (acceptStatus === SendStatus.SUCCESS) {
		setTimeout(() => {
			acceptStatus = SendStatus.NONE;
		}, 2000);
	}
	let declineStatus: SendStatus = SendStatus.NONE;
	$: if (declineStatus === SendStatus.SUCCESS) {
		setTimeout(() => {
			declineStatus = SendStatus.NONE;
		}, 2000);
	}
	let showModal = false;

	function declineInvitation() {
		$invitation?.members?.forEach((m) => (m.accepted = 'false'));
		updateInvitation(false);
	}

	function acceptInvitation() {
		$invitation?.members?.forEach((m) => (m.accepted = 'true'));
		if ($invitation?.members?.length > 1) {
			showModal = true;
		} else {
			updateInvitation(true);
		}
	}

	function updateInvitation(accepted: boolean) {
		if (accepted) acceptStatus = SendStatus.PENDING;
		else declineStatus = SendStatus.PENDING;
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

<div class="bg-white p-2 md:fixed md:bottom-0 md:right-0">
	<div class="flex gap-2 font-oswald">
		<button
			on:click={() => acceptInvitation()}
			{disabled}
			class="relative grow border-0 bg-black px-4 py-2 text-xl text-white ring-black ring-offset-2 ring-offset-white transition hover:bg-green-600 focus:ring-2"
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
			class="relative grow border-2 border-black py-2 px-4 text-xl ring-black ring-offset-2 ring-offset-white transition hover:border-red-600 hover:bg-red-600 hover:text-white focus:ring-2"
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
</div>
{#if showModal}
	<div
		class="fixed inset-0 z-50 h-screen w-screen font-oswald"
		transition:fade
		on:click|stopPropagation={() => (showModal = false)}
	>
		<div class="flex h-full items-center justify-center bg-black/50">
			<div
				on:click|stopPropagation
				transition:scale
				class="m-4 flex w-[32rem] max-w-[32rem] flex-col gap-2 border-4 border-black bg-white p-8"
			>
				{#each $invitation?.members || [] as member}
					<label class="inline-flex items-center">
						<input
							type="checkbox"
							checked={member.accepted === 'true'}
							on:change={(e) => (member.accepted = e.currentTarget.checked ? 'true' : 'false')}
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
