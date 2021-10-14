<script lang="ts">
	import type { Wedding } from '../types';
	export let wedding: Wedding;

	$: activeItem = 0;
</script>

<div
	id="program"
	class="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col transition-all"
	style="background-image: url('/images/backgrounds/{wedding?.details?.program?.[activeItem]
		?.background}.webp'"
>
	<div class="self-start relative m-12 max-w-[50%]">
		<div class="absolute top-0 left-0 w-full h-full bg-yellow-50 blur-lg" />
		<div class="relative p-12">
			<h1 class="text-6xl font-display mb-4">
				{wedding?.details?.program?.[activeItem]?.title}
			</h1>
			{#each wedding?.details?.program?.[activeItem]?.description || [] as line}
				<p>{line}</p>
			{/each}
		</div>
	</div>
	<div class="flex-grow"><!-- Spacer --></div>
	<div class="flex justify-between p-24 relative bg-gradient-to-t from-yellow-50 via-yellow-50">
		<div
			class="absolute top-1/2 left-28 right-28 transform -translate-y-1/2 bg-yellow-600 box-border h-4"
		/>
		{#each wedding?.details?.program || [] as programItem, i}
			<div
				on:click={() => (activeItem = i)}
				class="{activeItem === i
					? 'bg-yellow-700'
					: 'bg-yellow-600'} hover:bg-yellow-700 transition rounded-full w-24 h-24 p-4 text-white text-xl font-bold flex flex-col align-middle justify-center text-center z-0 ring-4 ring-yellow-600 ring-offset-4 ring-offset-yellow-50"
			>
				<span>
					{new Date(programItem.time).toLocaleTimeString(undefined, {
						hour: '2-digit',
						minute: '2-digit'
					})} Uhr
				</span>
			</div>
		{/each}
	</div>
</div>
