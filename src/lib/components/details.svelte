<script lang="ts">
	import { invitation, details } from '$lib/stores';
</script>

<div id="rsvp" class="min-h-full snap-start">
	<div class="container mx-auto flex flex-col items-center justify-center gap-2 p-6 md:gap-6">
		<h1
			class="my-2 max-w-full break-words text-center font-cheap-pine text-4xl md:my-4 md:text-6xl"
		>
			{$invitation?.salutation || ''}
		</h1>
		{#each $details?.text || [] as line}
			<p class="text-center font-oswald text-lg md:text-xl lg:text-2xl">
				{line}
			</p>
		{/each}
		<div class="mx-auto font-oswald text-xl">
			{#if $invitation?.members?.every((m) => m.accepted === 'true')}
				Wir freuen uns auf Euer Kommen!
			{:else if $invitation?.members?.some((m) => m.accepted === 'true')}
				Schade, dass Ihr nicht alle kommen könnt, aber wir freuen uns auf Euer Kommen!
			{:else if $invitation?.members?.every((m) => m.accepted === 'false')}
				Schade, dass Ihr nicht kommen könnt.
			{/if}
		</div>
	</div>
</div>
