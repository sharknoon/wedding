<script lang="ts">
	import { SendStatus } from '$lib/types';
	import { invitation, details } from '$lib/client/stores';
	import { fade, scale } from 'svelte/transition';
	import StatusIndicator from './status-indicator.svelte';

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
			class="relative grow border-0 bg-black px-4 py-2 text-xl text-white ring-black ring-offset-2 ring-offset-white transition hover:bg-green-600 focus:ring-2"
		>
			{#if $invitation.members.every((m) => m.accepted === 'unknown')}
				Teilnahme zusagen
			{:else if $invitation.members.every((m) => m.accepted === 'true')}
				Zugesagt
			{:else}
				{$invitation.members.filter((m) => m.accepted === 'true').length} zugesagt
			{/if}
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
		class="fixed inset-0 h-screen w-screen  max-w-[100vw] font-oswald"
		transition:fade
		on:click|stopPropagation={() => (showModal = false)}
	>
		<div class="flex h-full items-center justify-center bg-black/50">
			<div
				on:click|stopPropagation
				transition:scale
				class="flex w-[32rem] max-w-[32rem] flex-col gap-2 border-2 border-black bg-white p-3"
			>
				{#each $invitation?.members || [] as member}
					<div class="flex gap-2">
						<div>
							<span class="font-oswald">{member.name}</span>
							<div
								class="relative grid h-12 grid-cols-2 items-center gap-1 border-2 border-black p-1 text-center"
							>
								<div
									class="absolute top-1 bottom-1 left-1 right-[calc(50%+0.125rem)] bg-black transition-all {member.accepted ===
									'false'
										? 'left-[calc(50%+0.125rem)] right-1 bg-green-600'
										: 'left-1 right-[calc(50%+0.125rem)] bg-red-600'}"
								/>
								<button
									type="button"
									class="z-0 mb-1 px-1 text-lg {member.accepted === 'false'
										? 'text-black'
										: 'text-white'}"
									on:click={() => (member.accepted = 'true')}>zusagen</button
								>
								<button
									type="button"
									class="z-0 mb-1 px-1 text-lg {member.accepted === 'true'
										? 'text-black'
										: 'text-white'}"
									on:click={() => (member.accepted = 'false')}>absagen</button
								>
							</div>
						</div>
						<div>
							<span class="font-oswald">Ernährungsform</span>
							<div
								class="relative grid h-12 grid-cols-2 items-center gap-1 border-2 border-black p-1 text-center"
							>
								<div
									class="absolute top-1 bottom-1 left-1 right-[calc(50%+0.125rem)] bg-black transition-all {member.accepted ===
									'false'
										? 'left-[calc(50%+0.125rem)] right-1 bg-green-600'
										: 'left-1 right-[calc(50%+0.125rem)] bg-red-600'}"
								/>
								<button
									type="button"
									class="z-0 mb-1 px-1 text-lg {member.accepted === 'false'
										? 'text-black'
										: 'text-white'}"
									on:click={() => (member.accepted = 'true')}>Fleischer</button
								>
								<button
									type="button"
									class="z-0 mb-1 px-1 text-lg {member.accepted === 'false'
										? 'text-black'
										: 'text-white'}"
									on:click={() => (member.accepted = 'true')}>Vegetarier</button
								>
								<button
									type="button"
									class="z-0 mb-1 px-1 text-lg {member.accepted === 'true'
										? 'text-black'
										: 'text-white'}"
									on:click={() => (member.accepted = 'false')}>Veganer</button
								>
							</div>
						</div>
					</div>
				{/each}
				<button
					on:click={() => updateInvitation(true)}
					class="relative col-span-3 mt-4 border-0 bg-black py-2 px-4 text-xl text-white ring-black ring-offset-2 ring-offset-white transition hover:bg-black/75 focus:ring-2"
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
