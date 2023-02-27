<script lang="ts">
	import { invitation, details } from '$lib/client/stores';

	$: deadline = new Date($details?.deadline);
	$: text = $invitation.members.length > 1 ? $details.textPlural : $details.textSingular;
</script>

<div
	id="rsvp"
	class="container mx-auto flex min-h-full snap-start flex-col items-center justify-center gap-2 p-6 md:gap-6"
>
	<h1 class="my-2 max-w-full break-words text-center font-cheap-pine text-4xl md:my-4 md:text-6xl">
		{$invitation?.salutation || ''}
	</h1>
	{#each text || [] as line}
		<p class="text-center font-oswald text-lg md:text-xl lg:text-2xl">
			{line}
		</p>
	{/each}
	<p class="text-center font-oswald text-lg md:text-xl lg:text-2xl">
		{#if $invitation?.members?.every((m) => m.accepted === 'true')}
			{#if $invitation.members.length > 1}
				Wir freuen uns auf Euer Kommen!
			{:else}
				Wir freuen uns auf Dein Kommen!
			{/if}
		{:else if $invitation?.members?.some((m) => m.accepted === 'true')}
			Schade, dass Ihr nicht alle kommen könnt, aber wir freuen uns auf Euer Kommen!
		{:else if $invitation?.members?.every((m) => m.accepted === 'false')}
			{#if $invitation.members.length > 1}
				Schade, dass Ihr nicht kommen könnt.
			{:else}
				Schade, dass Du nicht kommen kannst.
			{/if}
		{:else if $invitation.members.length > 1}
			Meldet Euch bitte bis zum {deadline.toLocaleDateString('de-DE', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric'
			})} bei uns, damit wir wissen, ob Ihr kommt.
		{:else}
			Melde Dich bitte bis zum {deadline.toLocaleDateString('de-DE', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric'
			})} bei uns, damit wir wissen, ob Du kommst.
		{/if}
	</p>
	<div class="flex w-64 items-center gap-4">
		<div class="grow border-t-2 border-black" />
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-10 w-10"
			viewBox="0 0 20 20"
			fill="rgb(220,38,38)"
		>
			<path
				fill-rule="evenodd"
				d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
				clip-rule="evenodd"
			/>
		</svg>
		<div class="grow border-t-2 border-black" />
	</div>
</div>
