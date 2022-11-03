<script lang="ts">
	import { downloadNodeAsPng } from '$lib/client/download';
	import { details, downloadIds, invitations } from '$lib/client/stores';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;

	details.set(data.details);
	invitations.set(data.invitations);

	const tabs = [
		{
			name: 'Gästeliste',
			href: '/admin/invitations',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>`
		},
		{
			name: 'Druckvorlagen',
			href: '/admin/prints',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 512 512"><path d="M416 320H96c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h320c17.67 0 32-14.33 32-32v-128C448 334.3 433.7 320 416 320zM416 480H96v-128h320V480zM448 192V70.63C448 62.14 444.6 54 438.6 48l-38.63-38.63C393.1 3.37 385.9 0 377.4 0H128C92.65 0 64 28.65 64 64v128C28.7 192 0 220.7 0 256v112C0 376.8 7.156 384 16 384S32 376.8 32 368V256c0-17.67 14.33-32 32-32h384c17.67 0 32 14.33 32 32v112c0 8.844 7.156 16 16 16s16-7.156 16-16V256C512 220.7 483.3 192 448 192zM416 192H96V64c0-17.67 14.33-32 32-32h249.4L416 70.63V192zM432 248c-13.25 0-24 10.74-24 24c0 13.25 10.75 24 24 24s24-10.75 24-24C456 258.7 445.3 248 432 248z"/></svg>`
		}
	];
</script>

<div class="fixed inset-0 flex flex-col">
	<div class="flex flex-wrap justify-center gap-2">
		{#each tabs as tab}
			<a href={tab.href} class="relative flex items-center gap-1 py-4">
				{@html tab.icon}
				<span class="font-cheap-pine-sans text-2xl">{tab.name}</span>
				<div class="absolute bottom-0 h-1 w-full {tab.href === data.path ? 'bg-black' : ''}" />
			</a>
		{/each}
	</div>
	<div class="relative">
		<hr class="border-b-2 border-black pb-[-1px]" />
		{#if $downloadIds.length > 0}
			<button on:click={() => downloadNodeAsPng($downloadIds)} class="absolute right-4 top-4">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
					/>
				</svg>
			</button>
		{/if}
	</div>
	<div class="grow overflow-y-scroll p-2 md:p-16">
		<slot />
	</div>
</div>
