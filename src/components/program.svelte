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
		<div class="absolute top-0 left-0 w-full h-full bg-gray-50 blur-lg" />
		<div class="relative p-12">
			<h1 class="text-6xl font-display mb-4 text-gray-900">
				{wedding?.details?.program?.[activeItem]?.title}
			</h1>
			{#each wedding?.details?.program?.[activeItem]?.description || [] as line}
				<p class="text-gray-900">{line}</p>
			{/each}
		</div>
	</div>
	<div class="flex-grow"><!-- Spacer --></div>
	<div class="flex justify-between p-24 relative bg-gradient-to-t from-gray-50 via-gray-50">
		<div class="absolute top-1/2 left-28 right-28 transform -translate-y-1/2 bg-red-600 h-4" />
		{#each wedding?.details?.program || [] as programItem, i}
			<div
				on:click={() => (activeItem = i)}
				class="{activeItem === i
					? 'bg-red-700'
					: 'bg-red-600'} hover:bg-red-700 transition rounded-full w-24 h-24 p-4 text-xl font-bold flex flex-col align-middle justify-center text-center text-white z-0 ring-4 ring-red-600 ring-offset-4 ring-offset-gray-50"
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
