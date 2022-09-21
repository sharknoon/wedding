<script lang="ts">
	import type { Invitation, Member } from '$lib/types';
	import { onMount } from 'svelte';
	import { slide, fade } from 'svelte/transition';
	import { downloadIds, invitations } from '$lib/client/stores';

	$downloadIds = [];

	onMount(() => {
		const evtSource = new EventSource('/api/invitations/events');
		evtSource.onerror = (e) => console.error(e);
		const insertInvitation = (event: MessageEvent<any>) => {
			invitations.update((i) => {
				i.push(JSON.parse(event.data));
				return i;
			});
		};
		const updateInvitation = (event: MessageEvent<any>) => {
			const newInvitation = JSON.parse(event.data);
			invitations.update((i) =>
				i.map((oldInvitation) =>
					oldInvitation._id === newInvitation._id ? newInvitation : oldInvitation
				)
			);
		};
		const deleteInvitation = (event: MessageEvent<any>) => {
			invitations.update((i) => i.filter((i) => i._id !== event.data));
		};
		evtSource.addEventListener('insert', insertInvitation);
		evtSource.addEventListener('update', updateInvitation);
		evtSource.addEventListener('replace', updateInvitation);
		evtSource.addEventListener('delete', deleteInvitation);
	});

	const defaultMember: Member = {
		name: '',
		accepted: 'unknown'
	};

	let workingInvitation: Invitation;
	$: workingInvitation = {
		salutation: '',
		members: [{ ...defaultMember }]
	};

	function showInvitationModal(mode: 'create' | 'edit', invitation?: Invitation) {
		if (mode === 'edit' && invitation) {
			workingInvitation = invitation;
			modalTitle = 'Einladung bearbeiten';
		} else {
			workingInvitation = {
				salutation: '',
				members: [{ ...defaultMember }]
			};
			modalTitle = 'Neue Einladung erstellen';
		}

		showModal = true;
	}

	function addMember() {
		workingInvitation.members.push({ ...defaultMember });
		workingInvitation = workingInvitation;
	}

	function removeMember(index: number) {
		workingInvitation.members.splice(index, 1);
		workingInvitation = workingInvitation;
	}

	function hideInvitationModal() {
		showModal = false;
	}

	function createInvitation(invitation: Invitation) {
		fetch('/api/invitations', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(invitation)
		})
			.then((res) => {
				if (res.status >= 400) {
					alert('Die Einladung konnte nicht gespeichert werden');
				}
			})
			.catch((err) => alert(err));
		hideInvitationModal();
	}

	function updateInvitation(invitation: Invitation) {
		fetch(`/api/invitations/${invitation._id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(workingInvitation)
		})
			.then((res) => {
				if (res.status >= 400) {
					alert('Die Einladung konnte nicht gespeichert werden');
				}
			})
			.catch((err) => alert(err));
		hideInvitationModal();
	}

	function deleteInvitation(invitation: Invitation) {
		if (confirm('Sind Sie sich sicher, dass Sie die diese Einladung entgültig löschen möchten?')) {
			fetch(`/api/invitations/${invitation._id}`, { method: 'DELETE' }).catch((err) => alert(err));
		}
	}

	$: validInvitation =
		workingInvitation.salutation?.length > 0 &&
		workingInvitation.members.length > 0 &&
		workingInvitation.members.every((m) => m.name?.length > 0);

	let showModal = false;
	let modalTitle = '';

	$: acceptances = $invitations
		.map((i) => i.members.map((m) => m.accepted === 'true').filter((i) => i).length)
		.reduce((partialSum, a) => partialSum + a, 0);

	$: cancellations = $invitations
		.map((i) => i.members.map((m) => m.accepted === 'false').filter((i) => i).length)
		.reduce((partialSum, a) => partialSum + a, 0);

	$: notYetResponded = $invitations
		.map(
			(i) =>
				i.members.map((m) => m.accepted !== 'true' && m.accepted !== 'false').filter((i) => i)
					.length
		)
		.reduce((partialSum, a) => partialSum + a, 0);
</script>

<div class="container mx-auto font-oswald">
	<table class="w-full table-auto border-2 border-black text-lg">
		<thead>
			<tr class="h-full bg-black font-cheap-pine-sans text-xl text-white">
				<th class="py-2 px-1 sm:px-6 sm:py-4 sm:text-3xl"> Name </th>
				<th class="py-2 px-1 sm:px-6 sm:py-4 sm:text-3xl"> Teilnahme </th>
				<th class="py-2 px-1 sm:px-6 sm:py-4 sm:text-3xl"> Anrede </th>
				<th class="py-2 px-1 sm:px-6 sm:py-4 sm:text-3xl"> Aktionen </th>
			</tr>
		</thead>
		<tbody>
			{#each $invitations as invitation, invitationIndex}
				{@const rowspan = invitation.members.length}
				{#each invitation.members as member, memberIndex}
					<tr
						class:bg-gray-100={invitationIndex % 2 === 1}
						class={memberIndex === 0 ? 'border-black border-t-2' : ''}
					>
						<td
							class="h-7 px-3"
							class:pt-3={memberIndex === 0}
							class:pb-3={memberIndex === rowspan - 1}
						>
							<div transition:slide|local>{member.name}</div>
						</td>
						<td
							class="px-3"
							class:pt-3={memberIndex === 0}
							class:pb-3={memberIndex === rowspan - 1}
						>
							<div class="relative mx-auto h-7 w-7" transition:slide|local>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all {member.accepted ===
									'true'
										? 'h-6 w-6'
										: 'h-0 w-0'}"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
								</svg>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 transition-all {member.accepted ===
									'false'
										? 'h-6 w-6'
										: 'h-0 w-0'}"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
								</svg>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 transition-all {member.accepted ===
									'unknown'
										? 'h-6 w-6'
										: 'h-0 w-0'}"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
						</td>
						{#if memberIndex === 0}
							<td class="p-3" {rowspan}>
								<div transition:slide|local>{invitation.salutation}</div>
							</td>
							<td class="p-3" {rowspan}>
								<div
									transition:slide|local
									class="flex h-full flex-wrap items-center justify-center gap-4 md:flex-nowrap"
								>
									<a
										target="_blank"
										href={'/admin/savethedatecard?id=' + invitation._id}
										class="border-0 bg-black p-2 text-xl text-white ring-black ring-offset-2 ring-offset-white transition hover:bg-black/75 focus:ring-2"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="2"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
											/>
										</svg>
									</a>
									<a
										target="_blank"
										href={'/' + invitation._id}
										class="border-0 bg-black p-2 text-xl text-white ring-black ring-offset-2 ring-offset-white transition hover:bg-black/75 focus:ring-2"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="2"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
											/>
										</svg>
									</a>
									<button
										on:click={() => showInvitationModal('edit', invitation)}
										class="border-0 bg-black p-2 text-xl text-white ring-black ring-offset-2 ring-offset-white transition hover:bg-black/75 focus:ring-2"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="2"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
											/>
										</svg>
									</button>
									<button
										on:click={() => deleteInvitation(invitation)}
										class="border-0 bg-black p-2 text-xl text-white ring-black ring-offset-2 ring-offset-white transition hover:bg-red-600 focus:ring-2"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="2"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
											/>
										</svg>
									</button>
								</div>
							</td>
						{/if}
					</tr>
				{/each}
			{/each}
		</tbody>
	</table>

	<div class="my-6 mx-2 flex flex-col items-center justify-between gap-4 md:mx-0 md:flex-row">
		<div class="flex items-center gap-4">
			<span>
				{acceptances} Zusagen
			</span>
			<span>
				{cancellations} Absagen
			</span>
			<span>
				{notYetResponded} Noch nicht geantwortet
			</span>
		</div>
		<button
			on:click={() => showInvitationModal('create')}
			class="flex items-center justify-center gap-2 border-0 bg-black p-2 text-xl text-white ring-black ring-offset-2 ring-offset-white transition hover:bg-black/75 focus:ring-2 sm:min-w-[20rem]"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
			</svg>
			Neue Einladung erstellen
		</button>
	</div>
</div>

{#if showModal}
	<div
		class="fixed inset-0 h-screen w-screen max-w-[100vw] font-oswald"
		transition:fade
		on:click|stopPropagation={hideInvitationModal}
	>
		<div class="flex h-full items-center justify-center bg-black/50">
			<div
				class="flex w-[32rem] max-w-full flex-col border-2 border-black bg-white p-3"
				on:click|stopPropagation
			>
				<h1 class="my-6 text-center font-cheap-pine-sans text-4xl">{modalTitle}</h1>
				<span>Anrede</span>
				<input
					type="text"
					placeholder="Liebe Erika, lieber Max"
					bind:value={workingInvitation.salutation}
					class="border-transparent bg-gray-300 text-black transition focus:border-transparent focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-100"
				/>
				<span class="text-sm text-gray-600">
					Diese Anrede wird oben in der Einladung angezeigt. Typische Beispiele sind "Liebe Familie
					Mustermann" oder "Liebe Erika, lieber Max".
				</span>
				<span class="mt-3 text-center text-lg">Mitglieder</span>
				<div class="flex flex-col gap-2">
					{#each workingInvitation.members as member, index}
						<div class="flex items-end gap-2">
							<div class="grow">
								{#if index === 0}
									<span>Name</span>
								{/if}
								<input
									type="text"
									placeholder="Erika Mustermann"
									bind:value={member.name}
									class="h-10 w-full border-transparent bg-gray-300 text-black transition focus:border-transparent focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-100"
								/>
							</div>
							<div>
								{#if index === 0}
									<span>Teilnahme</span>
								{/if}
								<div class="flex">
									<button
										on:click={() => (member.accepted = 'unknown')}
										class="flex items-center justify-center gap-2 border-0 p-2 text-lg ring-black ring-offset-2 ring-offset-white transition focus:ring-2 {member.accepted ===
										'unknown'
											? 'bg-black text-white hover:bg-black/75'
											: 'bg-gray-300 hover:bg-gray-300/75'}"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="2"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
									</button>
									<button
										on:click={() => (member.accepted = 'true')}
										class="flex items-center justify-center gap-2 border-0 p-2 text-lg ring-black ring-offset-2 ring-offset-white transition focus:ring-2 {member.accepted ===
										'true'
											? 'bg-black text-white hover:bg-black/75'
											: 'bg-gray-300 hover:bg-gray-300/75'}"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="2"
										>
											<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
										</svg>
									</button>
									<button
										on:click={() => (member.accepted = 'false')}
										class="flex items-center justify-center gap-2 border-0 p-2 text-lg ring-black ring-offset-2 ring-offset-white transition focus:ring-2 {member.accepted ===
										'false'
											? 'bg-black text-white hover:bg-black/75'
											: 'bg-gray-300 hover:bg-gray-300/75'}"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="2"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								</div>
							</div>
							{#if workingInvitation.members.length > 1}
								<button
									on:click={() => removeMember(index)}
									class="flex items-center justify-center border-0 bg-black p-2 text-lg text-white ring-black ring-offset-2 ring-offset-white transition hover:bg-red-600 focus:ring-2"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										stroke-width="2"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
										/>
									</svg>
								</button>
							{/if}
						</div>
					{/each}
				</div>
				<button
					on:click={addMember}
					class="mt-3 flex items-center justify-center gap-2 self-start border-0 bg-black p-2 text-lg text-white ring-black ring-offset-2 ring-offset-white transition hover:bg-black/75 focus:ring-2"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
					</svg>
					Neues Mitglied hinzufügen
				</button>
				<div class="mt-6 flex max-w-full justify-end gap-3">
					<button
						on:click={hideInvitationModal}
						class="flex items-center justify-center gap-2 self-end border-2 border-black p-2 text-xl ring-black ring-offset-2 ring-offset-white transition hover:bg-black hover:text-white focus:ring-2"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
						Abbrechen
					</button>
					<button
						disabled={!validInvitation}
						on:click={() =>
							workingInvitation._id
								? updateInvitation(workingInvitation)
								: createInvitation(workingInvitation)}
						class="flex items-center justify-center gap-2 self-end border-2 border-black bg-black p-2 text-xl text-white ring-black ring-offset-2 ring-offset-white transition hover:border-neutral-900 hover:bg-neutral-900 focus:ring-2 disabled:border-neutral-700 disabled:bg-neutral-700"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
							/>
						</svg>
						Speichern
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
