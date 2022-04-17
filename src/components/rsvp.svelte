<script lang="ts">
	import type { Details, Invitation } from '../types';

	export let invitation: Invitation;
	export let details: Details;

	$: deadline = new Date(details?.deadline || null);
	$: disabled = new Date().getTime() > deadline.getTime();

	$: acceptedPersons = invitation?.members?.filter((m) => m.accepted) || [];
	let updateStatus = 'none';

	function updateInvitation() {
		updateStatus = 'pending';
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
				updateStatus = 'success';
			} else {
				updateStatus = 'error';
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

		<div
			class="relative m-2 flex w-full flex-col gap-4 border-4 border-black bg-gray-100 p-4 font-body md:w-10/12 md:p-8 lg:w-7/12 xl:w-5/12"
		>
			{#each invitation?.members || [] as member}
				<label class="inline-flex items-center">
					<input
						type="checkbox"
						bind:checked={member.accepted}
						{disabled}
						class="border-transparent bg-gray-300 text-red-600 transition hover:text-red-700 focus:border-transparent focus:bg-gray-300 focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-white"
					/>
					<span class="ml-2 max-w-full break-words text-xl text-gray-900">{member.name}</span>
				</label>
			{/each}
			<button
				on:click={() => updateInvitation()}
				{disabled}
				class="relative border-0 bg-black p-2 text-xl text-white ring-black ring-offset-2 ring-offset-white transition hover:bg-black/75 focus:ring-2"
			>
				{#if invitation?.members?.length === 1 && acceptedPersons.length === 1}
					Teilname zusagen
				{:else if acceptedPersons.length > 0}
					{acceptedPersons.length} Person{acceptedPersons.length !== 1 ? 'en' : ''} zusagen
				{:else}
					Teilnahme absagen
				{/if}
				<div class="absolute right-0 top-1/2 mr-2 -translate-y-1/2">
					{#if updateStatus === 'pending'}
						<svg
							class="-ml-1 mr-3 h-5 w-5 animate-spin"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								class="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"
							/>
							<path
								class="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							/>
						</svg>
					{:else if updateStatus === 'success'}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6 opacity-0 fadeOut"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							/>
						</svg>
					{:else if updateStatus === 'error'}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					{/if}
				</div>
			</button>
			{#if disabled}
				<div class="absolute top-0 right-0 bottom-0 left-0 bg-black/50" />
				<h1
					class="absolute bottom-1/2 translate-y-1/2 self-center text-center text-3xl text-white md:text-4xl"
				>
					Anmeldefrist abgelaufen
				</h1>
			{/if}
		</div>
	</div>
</div>

<style lang="postcss">
	.fadeOut {
		animation: fadeOut 4s cubic-bezier(0.4, 0, 0.6, 1);
	}

	@keyframes fadeOut {
		0%,
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>
