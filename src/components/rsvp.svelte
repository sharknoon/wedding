<script lang="ts">
	import { each } from 'svelte/internal';

	const deadline = new Date('2023-03-23T15:00:00+02:00');
	const invitationMembers = ['Max Mustermann', 'Erika Musterfrau', 'Karin Musterkind'];
</script>

<div id="rsvp" class="bg-yellow-100 min-h-screen max-h-screen relative font-body">
	<div
		class="container mx-auto min-h-screen max-h-screen flex items-center justify-center flex-col"
	>
		<h1 class="font-display text-6xl w-full">Liebe Familie Musterfamilie</h1>
		<p class="mt-4">
			Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
			invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
			justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
			ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
			eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
			et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
			sanctus est Lorem ipsum dolor sit amet.
		</p>
		<span>
			{deadline.toLocaleDateString(undefined, {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric'
			})}
		</span>
		<div class="border rounded-xl p-8 flex flex-col">
			{#each invitationMembers as member}
				<label class="inline-flex items-center">
					<input
						type="checkbox"
						checked
						class="rounded bg-gray-200 border-transparent focus:border-transparent focus:bg-gray-200 text-gray-700 focus:ring-1 focus:ring-offset-2 focus:ring-gray-500"
					/>
					<span class="ml-2">{member}</span>
				</label>
			{/each}
			<button class="bg-green-600">Zusagen</button>
			<button class="bg-red-600">Absagen</button>
		</div>
	</div>
</div>
