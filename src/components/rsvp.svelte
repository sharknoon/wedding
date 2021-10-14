<script lang="ts">
	import type { Wedding } from '../types';
	export let wedding: Wedding;

	$: deadline = new Date(wedding?.details?.deadline || null);
	$: disabled = new Date().getTime() > deadline.getTime();

	$: acceptedPersons = wedding?.invitation?.members?.filter((m) => m.accepted) || [];
	let updateStatus = 'none';

	function updateMembers() {
		updateStatus = 'pending';
		fetch(`https://midrene-und-josua.de/api/invitation/${wedding?.invitation?._id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(wedding?.invitation?.members)
		}).then((response) => {
			if (response.status === 200) {
				updateStatus = 'success';
			} else {
				updateStatus = 'error';
			}
		});
	}
</script>

<div id="rsvp" class="bg-yellow-100 min-h-screen relative">
	<div
		class="container mx-auto min-h-screen flex items-center flex-col justify-center gap-2 md:gap-6"
	>
		<h1 class="font-display text-4xl md:text-6xl text-center break-words max-w-full my-2 md:my-4">
			{wedding?.invitation?.salutation || ''}
		</h1>
		{#each wedding?.details?.text || [] as line}
			<p class="text-sm md:text-base lg:text-2xl text-center">
				{line}
			</p>
		{/each}

		<div
			class="{disabled
				? 'opacity-50'
				: ''} border-2 border-yellow-600 rounded-xl w-full bg-gray-100 md:w-10/12 lg:w-7/12 xl:w-5/12 p-4 md:p-8 m-2 flex flex-col gap-4 relative"
		>
			{#each wedding?.invitation?.members || [] as member}
				{#if wedding?.invitation?.members?.length > 1}
					<label class="{disabled ? 'cursor-default' : 'cursor-pointer'} inline-flex items-center">
						<input
							type="checkbox"
							bind:checked={member.accepted}
							{disabled}
							class="rounded bg-gray-300 border-transparent focus:border-transparent focus:bg-gray-300 text-yellow-600 hover:text-yellow-700 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-yellow-600 transition"
						/>
						<span class="ml-2 max-w-full break-words">{member.name}</span>
					</label>
				{/if}
			{/each}
			<button
				on:click={() => updateMembers()}
				{disabled}
				class="{disabled
					? 'cursor-default'
					: ''} p-2 rounded bg-yellow-600 hover:bg-yellow-700 border-2 border-yellow-600 hover:border-yellow-700 text-white focus:ring-2 ring-offset-2 ring-offset-gray-100 ring-yellow-600 transition relative"
			>
				{#if acceptedPersons.length > 0}
					{acceptedPersons.length} Person{acceptedPersons.length !== 1 ? 'en' : ''} zusagen
				{:else}
					Teilnahme absagen
				{/if}
				<div class="absolute right-0 top-1/2 transform -translate-y-1/2 mr-2">
					{#if updateStatus === 'pending'}
						<svg
							class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
				<h1
					class="absolute bottom-1/2 transform translate-y-1/2 text-gray-800 text-3xl md:text-4xl text-center self-center"
				>
					Anmeldefrist abgeloffen
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
