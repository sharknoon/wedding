<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { download } from '$lib/download';
	import { downloadIds } from '$lib/stores';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	const tabs = [
		{
			name: 'Einladungen',
			href: '/admin/invitations',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>`
		},
		{
			name: 'Save-the-Date Karte',
			href: '/admin/savethedatecard',
			icon: `<svg	xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path	stroke-linecap="round" stroke-linejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"	/></svg>`
		},
		{
			name: 'Programmheft',
			href: '/admin/schedule',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>`
		},
		{
			name: 'Menükarte',
			href: '/admin/menue',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" /></svg>`
		},
		{
			name: 'Musikwunschkarte',
			href: '/admin/musicwishcard',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>`
		},
		{
			name: 'Dankeskarte',
			href: '/admin/thankyoucard',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>`
		}
	];

	$: paths = tabs.map((t) => t.href);

	onMount(() => {
		if (!paths.includes(data.path)) {
			goto(tabs[0].href);
		}
	});
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
			<button on:click={() => download($downloadIds)} class="absolute right-4 top-4">
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
