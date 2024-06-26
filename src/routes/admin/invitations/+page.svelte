<script lang="ts">
	import type { Invitation, Member } from '$lib/types';
	import { onMount } from 'svelte';
	import { slide, fade, scale } from 'svelte/transition';
	import { invitations } from '$lib/client/stores';

	onMount(() => {
		const evtSource = new EventSource('/api/invitations/events');
		evtSource.onerror = (e) => console.error(e);
		const insertInvitation = (event: MessageEvent<string>) => {
			invitations.update((i) => {
				i.push(JSON.parse(event.data));
				return i;
			});
		};
		const updateInvitation = (event: MessageEvent<string>) => {
			const newInvitation = JSON.parse(event.data);
			invitations.update((i) =>
				i.map((oldInvitation) =>
					oldInvitation._id === newInvitation._id ? newInvitation : oldInvitation
				)
			);
		};
		const deleteInvitation = (event: MessageEvent<string>) => {
			invitations.update((i) => i.filter((i) => i._id !== event.data));
		};
		evtSource.addEventListener('insert', insertInvitation);
		evtSource.addEventListener('update', updateInvitation);
		evtSource.addEventListener('replace', updateInvitation);
		evtSource.addEventListener('delete', deleteInvitation);
	});

	const defaultMember: Member = {
		name: '',
		accepted: 'unknown',
		table: -1,
		diet: 'unknown'
	};

	let workingInvitation: Invitation;
	workingInvitation = {
		slug: '',
		salutation: '',
		members: [{ ...defaultMember }],
		allergies: '',
		position: $invitations.map((i) => i.position).reduce((a, b) => (a > b ? a : b), 0) + 10,
		hidden: false,
		views: 0
	};

	function generateSlug(existingInvitations: Invitation[], invitation: Invitation): string {
		const slug = invitation.members
			// map to the last name
			.map((m) => m.name.trim().split(' ').pop()?.toLowerCase())
			// filter out duplicates
			.filter((name, index, self) => self.indexOf(name) === index)
			// filter out empty strings and undefined
			.filter((name) => name?.length || 0 > 0)
			// replace umlauts
			.map((name) => replaceUmlauts(name || ''))
			.join('-');
		let slugWithNumber = slug;

		let counter = 1;
		// filter out own invitation
		const invitations = existingInvitations.filter((i) => i._id !== invitation._id);
		while (invitations.some((i) => i.slug.toLowerCase() === slugWithNumber)) {
			counter++;
			slugWithNumber = `${slug}${counter}`;
		}
		return slugWithNumber;
	}

	function replaceUmlauts(str: string) {
		return str
			.replace(/\u00df/g, 'ss')
			.replace(/\u00e4/g, 'ae')
			.replace(/\u00f6/g, 'oe')
			.replace(/\u00fc/g, 'ue')
			.replace(/\u00c4/g, 'Ae')
			.replace(/\u00d6/g, 'Oe')
			.replace(/\u00dc/g, 'Ue');
	}

	function cleanInvitation(invitation: Invitation) {
		invitation.slug = invitation.slug.trim();
		invitation.salutation = invitation.salutation.trim();
		invitation.members = invitation.members.map((i) => {
			i.name = i.name.trim();
			return i;
		});
	}

	function showInvitationModal(mode: 'create' | 'edit', invitation?: Invitation) {
		if (mode === 'edit' && invitation) {
			workingInvitation = invitation;
			modalTitle = 'Einladung bearbeiten';
		} else {
			workingInvitation = {
				slug: '',
				salutation: '',
				members: [{ ...defaultMember }],
				allergies: '',
				position: $invitations.map((i) => i.position).reduce((a, b) => (a > b ? a : b), 0) + 10,
				hidden: false,
				views: 0
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
		expandedMember = undefined;
	}

	function createInvitation(invitation: Invitation) {
		cleanInvitation(invitation);
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
		cleanInvitation(invitation);
		fetch(`/api/invitations/${invitation._id}`, {
			method: 'PUT',
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

	function deleteInvitation(invitation: Invitation) {
		if (confirm('Sind Sie sich sicher, dass Sie die diese Einladung entfernen möchten?')) {
			invitation.hidden = true;
			updateInvitation(invitation);
			//fetch(`/api/invitations/${invitation._id}`, { method: 'DELETE' }).catch((err) => alert(err));
		}
	}

	$: validInvitation =
		workingInvitation.salutation?.length > 0 &&
		workingInvitation.members.length > 0 &&
		workingInvitation.members.every((m) => m.name?.length > 0);

	let showModal = false;
	let modalTitle = '';
	let expandedMember: number | undefined = undefined;

	$: parties = $invitations.filter((i) => i.hidden !== true).length;

	$: guests = $invitations
		.filter((i) => i.hidden !== true)
		.map((i) => i.members.length)
		.reduce((partialSum, a) => partialSum + a, 0);

	$: acceptances = $invitations
		.filter((i) => i.hidden !== true)
		.map((i) => i.members.filter((m) => m.accepted === 'true').length)
		.reduce((partialSum, a) => partialSum + a, 0);

	$: cancellations = $invitations
		.filter((i) => i.hidden !== true)
		.map((i) => i.members.filter((m) => m.accepted === 'false').length)
		.reduce((partialSum, a) => partialSum + a, 0);

	$: notYetResponded = $invitations
		.filter((i) => i.hidden !== true)
		.map((i) => i.members.filter((m) => m.accepted !== 'true' && m.accepted !== 'false').length)
		.reduce((partialSum, a) => partialSum + a, 0);
</script>

<div class="container mx-auto font-oswald">
	<table class="w-full table-fixed break-words border-2 border-black text-lg">
		<thead>
			<tr class="h-full bg-black font-cheap-pine-sans text-xl text-white">
				<th class="px-1 py-2 sm:px-6 sm:py-4 sm:text-3xl">Name</th>
				<th class="px-1 py-2 sm:px-6 sm:py-4 sm:text-3xl" colspan="2">Infos</th>
				<th class="px-1 py-2 sm:px-6 sm:py-4 sm:text-3xl">Aktionen</th>
			</tr>
		</thead>
		<tbody>
			{#each $invitations.filter((i) => i.hidden !== true) as invitation, invitationIndex}
				{@const rowspan = invitation.members.length}
				{#each invitation.members as member, memberIndex}
					<tr
						class:bg-gray-100={invitationIndex % 2 === 1}
						class={memberIndex === 0 ? 'border-t-2 border-black' : ''}
					>
						<td
							class="px-2 sm:px-3"
							class:pt-3={memberIndex === 0}
							class:pb-3={memberIndex === rowspan - 1}
						>
							<div transition:slide|local>{member.name}</div>
						</td>
						<td
							class="px-2 sm:px-3"
							class:pt-3={memberIndex === 0}
							class:pb-3={memberIndex === rowspan - 1}
							transition:slide|local
						>
							<div class="flex flex-wrap gap-1 sm:gap-2">
								<div
									class="rounded-full p-0.5 text-white"
									class:bg-green-600={member.accepted === 'true'}
									class:bg-red-600={member.accepted === 'false'}
									class:bg-yellow-500={member.accepted === 'unknown'}
								>
									{#if member.accepted === 'true'}
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
									{:else if member.accepted === 'false'}
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
									{:else}
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
									{/if}
								</div>
								<div class="flex items-center gap-1 rounded-full bg-black pl-1 pr-2 text-white">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-6 w-6"
										viewBox="0 0 448 512"
										fill="currentColor"
									>
										<path
											d="M443.6 315.9L428.8 283.9C420.1 266.9 403.9 256 385.2 256h-1.212L384 112C384 50.25 333.8 0 272 0h-96C114.3 0 64 50.25 64 112L63.1 256H62.79C44.13 256 27.02 266.9 19.2 283.9L4.436 315.9c-6.883 14.95-5.697 32.13 3.156 45.98C13.43 371 22.13 377.4 32 380.9L31.1 496c0 8.836 7.164 16 16 16S64 504.8 64 496L63.1 384h320L384 496c0 8.836 7.166 16 16 16s16-7.164 16-16L416 380.9c9.873-3.512 18.57-9.91 24.41-19.05C449.3 348 450.4 330.8 443.6 315.9zM288 33.62C324.5 41.05 352 73.36 352 112V256h-64V33.62zM192 32h64v224H192V32zM96 112c0-38.64 27.53-70.95 64-78.38V256H96V112zM399.1 352H48.02c-11.74 0-19.38-12.17-14.53-22.7l14.76-32C50.86 291.6 56.56 288 62.79 288h322.4c6.223 0 11.93 3.648 14.53 9.297l14.76 31.99C419.4 339.9 411.6 352 399.1 352z"
										/>
									</svg>
									{member.table}
								</div>
								{#if member.diet === 'pescetarian' || member.diet === 'vegetarian' || member.diet === 'vegan'}
									<div
										class="group relative rounded-full p-0.5 text-white"
										class:bg-blue-700={member.diet === 'pescetarian'}
										class:bg-green-500={member.diet === 'vegetarian'}
										class:bg-green-700={member.diet === 'vegan'}
									>
										<div
											class="absolute -top-1 left-1/2 hidden -translate-x-1/2 -translate-y-full rounded border-2 border-white bg-black px-1 text-white group-hover:block"
										>
											{#if member.diet === 'pescetarian'}
												Pescetarier:in
											{:else if member.diet === 'vegetarian'}
												Vegetarier:in
											{:else if member.diet === 'vegan'}
												Veganer:in
											{/if}
										</div>
										{#if member.diet === 'pescetarian'}
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 576 512"
												class="h-6 w-6"
												fill="currentColor"
											>
												<path
													d="M180.5 141.5C219.7 108.5 272.6 80 336 80s116.3 28.5 155.5 61.5c39.1 33 66.9 72.4 81 99.8c4.7 9.2 4.7 20.1 0 29.3c-14.1 27.4-41.9 66.8-81 99.8C452.3 403.5 399.4 432 336 432s-116.3-28.5-155.5-61.5c-16.2-13.7-30.5-28.5-42.7-43.1L48.1 379.6c-12.5 7.3-28.4 5.3-38.7-4.9S-3 348.7 4.2 336.1L50 256 4.2 175.9c-7.2-12.6-5-28.4 5.3-38.6s26.1-12.2 38.7-4.9l89.7 52.3c12.2-14.6 26.5-29.4 42.7-43.1zM448 256c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32z"
												/>
											</svg>
										{:else if member.diet === 'vegetarian'}
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 512 512"
												class="h-6 w-6"
												fill="currentColor"
											>
												<path
													d="M272 96c-78.6 0-145.1 51.5-167.7 122.5c33.6-17 71.5-26.5 111.7-26.5h88c8.8 0 16 7.2 16 16s-7.2 16-16 16H288 216s0 0 0 0c-16.6 0-32.7 1.9-48.3 5.4c-25.9 5.9-49.9 16.4-71.4 30.7c0 0 0 0 0 0C38.3 298.8 0 364.9 0 440v16c0 13.3 10.7 24 24 24s24-10.7 24-24V440c0-48.7 20.7-92.5 53.8-123.2C121.6 392.3 190.3 448 272 448l1 0c132.1-.7 239-130.9 239-291.4c0-42.6-7.5-83.1-21.1-119.6c-2.6-6.9-12.7-6.6-16.2-.1C455.9 72.1 418.7 96 376 96L272 96z"
												/>
											</svg>
										{:else if member.diet === 'vegan'}
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 512 512"
												class="h-6 w-6"
												fill="currentColor"
											>
												<path
													d="M512 32V64c0 113.6-84.6 207.5-194.2 222c-7.1-53.4-30.6-101.6-65.3-139.3C290.8 78.3 364 32 448 32h64zM0 96H64c123.7 0 224 100.3 224 224v32 96 32H224V448 352C100.3 352 0 251.7 0 128V96z"
												/>
											</svg>
										{/if}
									</div>
								{/if}
							</div>
						</td>
						{#if memberIndex === 0}
							<td class="p-2 sm:p-3" {rowspan}>
								{#if invitation.allergies}
									<div class="flex items-center gap-2">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-6 w-6">
											<path
												d="M198.4 36C208.8 14.7 230.7 0 256 0s47.2 14.7 57.6 36c7-2.6 14.5-4 22.4-4c35.3 0 64 28.7 64 64v2c5.1-1.3 10.5-2 16-2c35.3 0 64 28.7 64 64V336c0 1.5-.1 3-.4 4.5c-6.2 91.7-79.4 165-171.1 171.1c-1.5 .3-2.9 .4-4.5 .4h-8-8.5c-67.9 0-133-27-181-75L18.7 349.3c-25-25-25-65.5 0-90.5s65.5-25 90.5 0l2.7 2.7V96c0-35.3 28.7-64 64-64c7.9 0 15.4 1.4 22.4 4zM240 232c0 13.3-10.7 24-24 24s-24-10.7-24-24V95.9c0-8.8-7.2-15.9-16-15.9c-8.8 0-16 7.2-16 16V319.4c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2L75.3 292.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l87.8 87.8c39 39 91.9 60.9 147.1 60.9H296h4.9c.6-.1 1.3-.1 1.9-.2c69.7-3.4 125.6-59.3 129-129c0-.6 .1-1.3 .2-1.9V160c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 .1V232c0 13.3-10.7 24-24 24s-24-10.7-24-24V152l0-.1V96c0-8.8-7.2-16-16-16s-16 7.1-16 16l0 .1V232c0 13.3-10.7 24-24 24s-24-10.7-24-24V96l0-.1V64c0-8.8-7.2-16-16-16s-16 7.2-16 16V96l0 .1V232zm0 88a16 16 0 1 1 32 0 16 16 0 1 1 -32 0zm48 48a16 16 0 1 1 32 0 16 16 0 1 1 -32 0zm80-64a16 16 0 1 1 0 32 16 16 0 1 1 0-32zM320 416a16 16 0 1 1 32 0 16 16 0 1 1 -32 0zm-64-16a16 16 0 1 1 0 32 16 16 0 1 1 0-32zm-80-32a16 16 0 1 1 32 0 16 16 0 1 1 -32 0z"
											/>
										</svg>
										{invitation.allergies}
									</div>
								{/if}
								{#if invitation.views !== undefined}
									<div class="flex items-center gap-2">
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
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
											/>
										</svg>
										{invitation.views}
									</div>
								{/if}
							</td>
						{/if}
						{#if memberIndex === 0}
							<td class="p-2 sm:p-3" {rowspan}>
								<div
									transition:slide|local
									class="flex h-full flex-wrap items-center justify-center gap-4 md:flex-nowrap"
								>
									<a
										href={'/admin/invitation?slug=' + invitation.slug}
										class="border-0 bg-black p-2 text-xl text-white ring-black ring-offset-2 ring-offset-white transition hover:bg-black/75 focus:ring-2"
										target="_blank"
										rel="noreferrer"
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
										href={'/' + invitation.slug}
										class="border-0 bg-black p-2 text-xl text-white ring-black ring-offset-2 ring-offset-white transition hover:bg-black/75 focus:ring-2"
										target="_blank"
										rel="noreferrer"
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
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
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

	<div class="mx-2 my-6 flex flex-col items-center justify-between gap-4 md:mx-0 md:flex-row">
		<div class="flex items-center gap-4">
			<span>
				{parties} Parteien
			</span>
			<span>
				{guests} Gäste
			</span>
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
		class="fixed inset-0 flex items-center justify-center bg-black/50 font-oswald"
		transition:fade
		role="button"
		tabindex="0"
		on:click|stopPropagation={(e) => {
			if (e.target === e.currentTarget) {
				hideInvitationModal();
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
			class="flex max-h-screen w-[32rem] max-w-full flex-col overflow-auto border-2 border-black bg-white p-3"
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
					<div>
						<div class="flex items-end gap-2">
							<div class="grow">
								<span>Name</span>
								<input
									type="text"
									placeholder="Erika Mustermann"
									bind:value={member.name}
									on:input={() =>
										(workingInvitation.slug = generateSlug($invitations, workingInvitation))}
									class="h-10 w-full border-transparent bg-gray-300 text-black transition focus:border-transparent focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-100"
								/>
							</div>
							<div>
								<span>Teilnahme</span>
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
							<button
								class="flex items-center justify-center border-0 p-2 text-lg transition {expandedMember ===
								index
									? 'rotate-180'
									: ''}"
								on:click={() =>
									expandedMember === index
										? (expandedMember = undefined)
										: (expandedMember = index)}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
								</svg>
							</button>
						</div>
						{#if expandedMember === index}
							<div class="flex items-end gap-2" transition:slide|local>
								<div class="w-14">
									<span>Tisch</span>
									<input
										type="number"
										min="1"
										max="10"
										placeholder="1"
										bind:value={member.table}
										class="h-10 w-14 border-transparent bg-gray-300 text-black transition focus:border-transparent focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-100"
									/>
								</div>
								<div>
									<span>Ernährungsform</span>
									<div class="flex">
										<button
											on:click={() => (member.diet = 'unknown')}
											class="flex items-center justify-center gap-2 border-0 p-2 text-lg ring-black ring-offset-2 ring-offset-white transition focus:ring-2 {member.diet ===
												'unknown' || !member.diet
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
											on:click={() => (member.diet = 'omnivorian')}
											class="flex items-center justify-center gap-2 border-0 p-2 text-lg ring-black ring-offset-2 ring-offset-white transition focus:ring-2 {member.diet ===
											'omnivorian'
												? 'bg-black text-white hover:bg-black/75'
												: 'bg-gray-300 hover:bg-gray-300/75'}"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 576 512"
												class="h-6 w-6"
												fill="currentColor"
											>
												<path
													d="M268.8 37.4C295.7 12.4 329.7 0 368 0c65 0 117.7 39 150.5 80c33.9 42.4 57.5 99.6 57.5 160c0 83.9-55.1 152.8-113.4 196.2C402.1 481.2 321.7 512 240 512c-36.8 0-86.5-4.4-130-19.3C73.4 480.1 0 444.3 0 360c0-38.6 17.8-68.3 42.5-88.1c19.6-15.8 41.4-26.8 63.3-37.8c27.3-13.8 54.6-27.6 77.7-50.7c13.8-13.8 19.7-27.9 30-52.9c3.2-7.7 6.8-16.5 11.2-26.6c7.7-17.6 20.6-44.7 44.1-66.5zm36.8 122l0 0c2.5-6 4.8-11.8 7.1-17c6.9-15.7 13.3-27.1 21.5-34.7c7.5-7 17.5-11.7 33.9-11.7c25.4 0 53.3 16.2 75.5 44c22 27.5 36.5 64.1 36.5 100c0 40.8-28.3 84.6-74.7 119.2C359.4 393.4 298.6 416 240 416c-31 0-69.1-3.9-98.8-14.1C110.1 391.2 96 376.7 96 360c0-9 2.6-13.2 6.9-16.9c5.8-5 15-9.1 30.2-15.5l1.2-.5c29.3-12.4 71.2-30 117-75.8c28.6-28.6 42.9-63.7 54.3-91.9zm6.8-75.2c-13.3 12.4-21.9 29-29 45.3c-2.9 6.6-5.6 13.2-8.3 19.8c-11.4 27.8-22.8 55.7-46.4 79.3c-41.4 41.4-78.6 57.1-107 69l-1.1 .5-.7 .3 0 0c-13.5 5.7-27.5 11.6-37.7 20.3C70.4 328.8 64 342.1 64 360c0 39.3 33.9 60.8 66.8 72.1C165.1 443.9 207 448 240 448c66.3 0 133.6-25.4 184.4-63.2C474.8 347.4 512 295.2 512 240c0-44.1-17.5-87.5-43.5-120C442.7 87.8 406.6 64 368 64c-23.7 0-41.7 7.3-55.6 20.3zM384 256c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32z"
												/>
											</svg>
										</button>
										<button
											on:click={() => (member.diet = 'pescetarian')}
											class="flex items-center justify-center gap-2 border-0 p-2 text-lg ring-black ring-offset-2 ring-offset-white transition focus:ring-2 {member.diet ===
											'pescetarian'
												? 'bg-black text-white hover:bg-black/75'
												: 'bg-gray-300 hover:bg-gray-300/75'}"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 576 512"
												class="h-6 w-6"
												fill="currentColor"
											>
												<path
													d="M180.5 141.5C219.7 108.5 272.6 80 336 80s116.3 28.5 155.5 61.5c39.1 33 66.9 72.4 81 99.8c4.7 9.2 4.7 20.1 0 29.3c-14.1 27.4-41.9 66.8-81 99.8C452.3 403.5 399.4 432 336 432s-116.3-28.5-155.5-61.5c-16.2-13.7-30.5-28.5-42.7-43.1L48.1 379.6c-12.5 7.3-28.4 5.3-38.7-4.9S-3 348.7 4.2 336.1L50 256 4.2 175.9c-7.2-12.6-5-28.4 5.3-38.6s26.1-12.2 38.7-4.9l89.7 52.3c12.2-14.6 26.5-29.4 42.7-43.1zM448 256c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32z"
												/>
											</svg>
										</button>
										<button
											on:click={() => (member.diet = 'vegetarian')}
											class="flex items-center justify-center gap-2 border-0 p-2 text-lg ring-black ring-offset-2 ring-offset-white transition focus:ring-2 {member.diet ===
											'vegetarian'
												? 'bg-black text-white hover:bg-black/75'
												: 'bg-gray-300 hover:bg-gray-300/75'}"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 512 512"
												class="h-6 w-6"
												fill="currentColor"
											>
												<path
													d="M272 96c-78.6 0-145.1 51.5-167.7 122.5c33.6-17 71.5-26.5 111.7-26.5h88c8.8 0 16 7.2 16 16s-7.2 16-16 16H288 216s0 0 0 0c-16.6 0-32.7 1.9-48.3 5.4c-25.9 5.9-49.9 16.4-71.4 30.7c0 0 0 0 0 0C38.3 298.8 0 364.9 0 440v16c0 13.3 10.7 24 24 24s24-10.7 24-24V440c0-48.7 20.7-92.5 53.8-123.2C121.6 392.3 190.3 448 272 448l1 0c132.1-.7 239-130.9 239-291.4c0-42.6-7.5-83.1-21.1-119.6c-2.6-6.9-12.7-6.6-16.2-.1C455.9 72.1 418.7 96 376 96L272 96z"
												/>
											</svg>
										</button>
										<button
											on:click={() => (member.diet = 'vegan')}
											class="flex items-center justify-center gap-2 border-0 p-2 text-lg ring-black ring-offset-2 ring-offset-white transition focus:ring-2 {member.diet ===
											'vegan'
												? 'bg-black text-white hover:bg-black/75'
												: 'bg-gray-300 hover:bg-gray-300/75'}"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 512 512"
												class="h-6 w-6"
												fill="currentColor"
											>
												<path
													d="M512 32V64c0 113.6-84.6 207.5-194.2 222c-7.1-53.4-30.6-101.6-65.3-139.3C290.8 78.3 364 32 448 32h64zM0 96H64c123.7 0 224 100.3 224 224v32 96 32H224V448 352C100.3 352 0 251.7 0 128V96z"
												/>
											</svg>
										</button>
									</div>
								</div>
							</div>
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

			<span class="mt-3">Allergien</span>
			<textarea
				placeholder="Max hat eine Nussallergie"
				bind:value={workingInvitation.allergies}
				class="h-10 grow border-transparent bg-gray-300 text-black transition focus:border-transparent focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-100"
			/>

			<span class="mt-3">Einladungscode</span>
			<input
				type="text"
				placeholder="mustermann"
				bind:value={workingInvitation.slug}
				class="h-10 grow border-transparent bg-gray-300 text-black transition focus:border-transparent focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-100"
			/>
			<span class="text-sm text-gray-600">
				Mit diesem Code kann man die Einladung ansehen. Bei Bedarf kann dieser geändert werden.
			</span>
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
{/if}
