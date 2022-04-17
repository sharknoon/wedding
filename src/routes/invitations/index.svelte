<script lang="ts">
	import type { Invitation } from 'src/types';

	export let invitations: Invitation[];

	function deleteInvitation(invitation: Invitation) {
		confirm('Sind Sie sich sicher, dass Sie die diese Einladung entgültig löschen möchten?') &&
			fetch(`/admin?id=${invitation._id}`, { method: 'DELETE' })
				.then(() => {
					invitations = invitations.filter((i) => i._id !== invitation._id);
				})
				.catch((err) => alert(err));
	}

	$: newInvitation = {
		_id: undefined,
		salutation: '',
		members: [
			{
				name: '',
				accepted: undefined
			}
		],
		hotelRoomInterest: undefined
	};

	function addMember() {
		newInvitation.members.push({ name: '', accepted: undefined });
		newInvitation = newInvitation;
	}

	function removeMember(index: number) {
		newInvitation.members.splice(index, 1);
		newInvitation = newInvitation;
	}

	function resetInvitationCreation() {
		newInvitation = {
			_id: undefined,
			salutation: '',
			members: [
				{
					name: '',
					accepted: undefined
				}
			],
			hotelRoomInterest: undefined
		};
		showModal = false;
	}

	function createInvitation() {
		invitations.push(newInvitation);
		invitations = invitations;
		fetch('/admin', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newInvitation, (_, v) => (v === undefined ? null : v))
		}).catch((err) => {
			invitations.pop();
			alert(err);
		});
		resetInvitationCreation();
	}

	$: {
		newInvitation._id = newInvitation.members
			.map((m) => m.name.trim().split(' ').pop().toLowerCase())
			.join('-');
	}

	$: validInvitation = false;

	$: {
		validInvitation =
			newInvitation.salutation?.length > 0 &&
			newInvitation.members.length > 0 &&
			newInvitation.members.every((m) => m.name?.length > 0);
	}

	$: showModal = false;
</script>

<div class="container mx-auto font-body">
	<h1 class="my-6 text-center font-display text-6xl">Einladungen</h1>

	<div
		class="grid grid-cols-[1fr_2fr_1fr] items-center divide-y-2 divide-black border-2 border-black text-lg"
	>
		<div class="h-full bg-black px-6 py-4 text-center font-heading text-3xl text-white">Name</div>
		<div class="h-full bg-black px-6 py-4 text-center font-heading text-3xl text-white">
			Teilnahme
		</div>
		<div class="h-full bg-black px-6 py-4 text-center font-heading text-3xl text-white">
			Aktionen
		</div>
		{#each invitations as invitation, index}
			<div
				class="flex h-full flex-col justify-center gap-2 px-6 py-4 {index % 2 === 1
					? 'bg-gray-100'
					: ''}"
			>
				{#each invitation.members as member}
					<div>{member.name}</div>
				{/each}
			</div>
			<div
				class="flex h-full flex-col justify-center gap-2 px-6 py-4 {index % 2 === 1
					? 'bg-gray-100'
					: ''}"
			>
				{#each invitation.members as member}
					{#if member.accepted}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="mx-auto h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
						</svg>
					{:else if member.accepted === false}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6 mx-auto"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-full w-6 mx-auto"
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
					{/if}
				{/each}
			</div>
			<div
				class="flex h-full items-center justify-center gap-4 p-4 {index % 2 === 1
					? 'bg-gray-100'
					: ''}"
			>
				<a
					href={'/prints/invitation?id=' + invitation._id}
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
		{/each}
	</div>

	<div class="my-6 flex justify-between">
		<div class="flex items-center gap-4">
			<span>
				{invitations
					.map((i) => i.members.map((m) => m.accepted).filter((i) => i).length)
					.reduce((partialSum, a) => partialSum + a, 0)} Zusagen
			</span>
			<span>
				{invitations
					.map((i) => i.members.map((m) => m.accepted === false).filter((i) => i).length)
					.reduce((partialSum, a) => partialSum + a, 0)} Absagen
			</span>
			<span>
				{invitations
					.map((i) => i.members.map((m) => m.accepted === null).filter((i) => i).length)
					.reduce((partialSum, a) => partialSum + a, 0)} Noch nicht geantwortet
			</span>
		</div>
		<button
			on:click={() => (showModal = true)}
			class="flex min-w-[20rem] items-center justify-center gap-2 border-0 bg-black p-2 text-xl text-white ring-black ring-offset-2 ring-offset-white transition hover:bg-black/75 focus:ring-2"
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
	<div class="fixed inset-0 h-screen w-screen font-body">
		<div class="flex h-full items-center justify-center bg-black/50">
			<div class="flex w-[32rem] max-w-[32rem] flex-col border-2 border-black bg-white p-3">
				<h1 class="my-6 text-center font-heading text-4xl">Neue Einladung erstellen</h1>
				<span>Anrede</span>
				<input
					type="text"
					placeholder="Liebe Erika, lieber Max"
					bind:value={newInvitation.salutation}
					class="col-span-3 border-transparent bg-gray-300 text-black transition hover:text-black/75 focus:border-transparent focus:bg-gray-300 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-100"
				/>
				<span class="text-sm text-gray-600">
					Diese Anrede wird oben in der Einladung angezeigt. Typische Beispiele sind "Liebe Familie
					Mustermann" oder "Liebe Erika, lieber Max".
				</span>
				<span class="mt-3 text-center text-lg">Mitglieder</span>
				{#each newInvitation.members as member, index}
					<span>Name</span>
					<div class="col-span-3 flex gap-2">
						<input
							type="text"
							placeholder="Erika Mustermann"
							bind:value={member.name}
							class="w-full border-transparent bg-gray-300 text-black transition hover:text-black/75 focus:border-transparent focus:bg-gray-300 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-100"
						/>
						{#if newInvitation.members.length > 1}
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
				<div class="mt-6 flex max-w-full items-center gap-3">
					<div class="min-w-0 grow break-words">
						midrene-und-josua.de/{newInvitation._id}
					</div>
					<button
						on:click={() => resetInvitationCreation()}
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
						on:click={createInvitation}
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
