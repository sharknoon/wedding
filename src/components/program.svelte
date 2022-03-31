<script lang="ts">
	import type { Wedding } from '../types';
	export let wedding: Wedding;

	$: activeItem = 0;
</script>

<div
	id="program"
	class="flex min-h-screen flex-col bg-cover bg-center bg-no-repeat transition-all"
	style="background-image: url('/images/backgrounds/{wedding?.details?.program?.[activeItem]
		?.background}.webp'"
>
	<div class="relative m-12 flex max-w-[50%] self-start">
		<div class="relative divide-y-2 divide-red-600 border-4 border-black bg-white p-12">
			<h1 class="pb-2 font-cheap-pine text-6xl text-gray-900">
				{wedding?.details?.program?.[activeItem]?.title}
			</h1>
			<div class="pt-2">
				{#each wedding?.details?.program?.[activeItem]?.description || [] as line}
					<p class="font-cheap-pine-sans text-2xl text-gray-900">{line}</p>
				{/each}
			</div>
		</div>
	</div>
	<div class="grow"><!-- Spacer --></div>
	<div class="relative flex justify-between bg-gradient-to-t from-gray-50 via-gray-50 p-24">
		<div class="absolute top-1/2 left-28 right-28 h-4 -translate-y-1/2 bg-black" />
		{#each wedding?.details?.program || [] as programItem, i}
			<div
				on:click={() => (activeItem = i)}
				class="{activeItem === i
					? 'bg-black hover:bg-gray-900 ring-red-600'
					: 'bg-white text-black hover:bg-gray-300 ring-black'} z-0 flex h-24 w-24 flex-col justify-center p-4 text-center align-middle font-cheap-pine-sans text-xl font-bold text-white ring-4 ring-offset-4 ring-offset-gray-50 transition"
			>
				<span class="text-3xl">
					{new Date(programItem.time).toLocaleTimeString(undefined, {
						hour: '2-digit',
						minute: '2-digit'
					})} Uhr
				</span>
			</div>
		{/each}
	</div>
</div>
