<script lang="ts">
	import { invitation, details } from '$lib/client/stores';

	$: deadline = new Date($details?.deadline);
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
		<p class="text-center font-oswald text-lg md:text-xl lg:text-2xl">
			{#if $invitation?.members?.every((m) => m.accepted === 'true')}
				Wir freuen uns auf Euer Kommen!
			{:else if $invitation?.members?.some((m) => m.accepted === 'true')}
				Schade, dass Ihr nicht alle kommen könnt, aber wir freuen uns auf Euer Kommen!
			{:else if $invitation?.members?.every((m) => m.accepted === 'false')}
				Schade, dass Ihr nicht kommen könnt.
			{:else}
				Meldet Euch bitte bis zum {deadline.toLocaleDateString('de-DE', {
					day: '2-digit',
					month: '2-digit',
					year: 'numeric'
				})} bei uns, damit wir wissen, ob Ihr kommt.
			{/if}
		</p>
	</div>
</div>
