<script lang="ts">
	import type { Details } from '$lib/types';
	export let details: Details;

	// TODO add image preloading

	$: activeItem = 0;
</script>

<div
	id="program"
	class="flex min-h-screen flex-col bg-cover bg-center bg-no-repeat transition-all"
	style="background-image: url('/images/backgrounds/{details?.program?.[activeItem]
		?.background}.jpg'"
>
	<div class="m-6 flex self-start md:m-12 md:max-w-[50%]">
		<div class="divide-y-2 divide-red-600 border-4 border-black bg-white p-6 md:p-12">
			<h1 class="pb-2 font-cheap-pine text-4xl text-gray-900 md:text-6xl">
				{details?.program?.[activeItem]?.title}
			</h1>
			<div class="pt-2">
				{#each details?.program?.[activeItem]?.description || [] as line}
					<p class="font-oswald text-xl text-gray-900 md:text-2xl">{line}</p>
				{/each}
			</div>
		</div>
	</div>
	<div class="grow"><!-- Spacer --></div>
	<div class="relative grid grid-cols-3 justify-between gap-12 p-8 sm:flex sm:p-16 md:p-24">
		<div
			class="absolute top-1/2 left-16 right-16 hidden h-4 -translate-y-1/2 bg-black sm:block md:left-28 md:right-28"
		/>
		{#each details?.program || [] as programItem, i}
			<div
				on:click={() => (activeItem = i)}
				class="{activeItem === i
					? 'bg-black text-white hover:bg-gray-900 ring-red-600'
					: 'bg-white text-black hover:bg-gray-300 ring-black'} z-0 flex aspect-square flex-col justify-center align-middle ring-4 ring-offset-4 ring-offset-gray-50 transition sm:h-12 sm:w-12 md:h-16 md:w-16 md:p-2 lg:h-20 lg:w-20 lg:p-4 xl:h-24 xl:w-24"
			>
				<span class="text-center font-cheap-pine-sans text-xl md:text-2xl lg:text-3xl">
					<span class="font-bold">
						{new Date(programItem.time).toLocaleTimeString(undefined, {
							hour: '2-digit',
							minute: '2-digit'
						})}
					</span>
					<span>Uhr</span>
				</span>
			</div>
		{/each}
	</div>
</div>
