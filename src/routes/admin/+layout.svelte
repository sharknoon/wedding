<script lang="ts">
	import { downloadNodeAsPng } from '$lib/download';
	import { downloadIds } from '$lib/stores';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	const tabs = [
		{
			name: 'Gästeliste',
			href: '/admin/invitations',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>`
		},
		{
			name: 'Save-the-Date Karte',
			href: '/admin/savethedatecard',
			icon: `<svg	xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path	stroke-linecap="round" stroke-linejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"	/></svg>`
		},
		{
			name: 'Programmheft',
			href: '/admin/schedule',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 512 512"><path d="M64 64C81.67 64 96 78.33 96 96C96 113.7 81.67 128 64 128C46.33 128 32 113.7 32 96C32 78.33 46.33 64 64 64zM488 72C501.3 72 512 82.75 512 96C512 109.3 501.3 120 488 120H184C170.7 120 160 109.3 160 96C160 82.75 170.7 72 184 72H488zM488 232C501.3 232 512 242.7 512 256C512 269.3 501.3 280 488 280H184C170.7 280 160 269.3 160 256C160 242.7 170.7 232 184 232H488zM488 392C501.3 392 512 402.7 512 416C512 429.3 501.3 440 488 440H184C170.7 440 160 429.3 160 416C160 402.7 170.7 392 184 392H488zM64 288C46.33 288 32 273.7 32 256C32 238.3 46.33 224 64 224C81.67 224 96 238.3 96 256C96 273.7 81.67 288 64 288zM64 384C81.67 384 96 398.3 96 416C96 433.7 81.67 448 64 448C46.33 448 32 433.7 32 416C32 398.3 46.33 384 64 384z"/></svg>`
		},
		{
			name: 'Menükarte',
			href: '/admin/menucard',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 448 512"><path d="M448 71.3C448 71.53 448 71.77 448 72V488C448 494.4 445.5 500.5 440.1 504.1C436.5 509.5 430.4 512 424 512C417.6 512 411.5 509.5 407 504.1C402.5 500.5 400 494.4 400 488V352H351.2C342.8 352 334.4 350.3 326.6 347.1C318.9 343.8 311.8 339.1 305.8 333.1C299.9 327.1 295.2 320 291.1 312.2C288.8 304.4 287.2 296 287.2 287.6L288 173.8C287.1 136.9 299.1 100.8 319.7 70.28C340.4 39.71 369.8 16.04 404.1 2.336C407.9 .7942 411.9 .001 416 .0003C424.5 .0003 432.6 3.372 438.6 9.373C444.6 15.37 448 23.51 448 32V71.3zM400 58.08C380.4 70.33 364.2 87.39 352.1 107.6C341.8 127.9 335.9 150.7 336 173.8L335.2 288C335.2 292.2 336.9 296.3 339.9 299.3C342.9 302.3 346.1 304 351.2 304H399L400 58.08zM240.1 7.029C245.5 11.53 248 17.63 248 24V184C247.1 207.3 238.7 229.7 222.2 246.2C205.7 262.7 183.3 271.1 160 272H152V488C152 494.4 149.5 500.5 144.1 504.1C140.5 509.5 134.4 512 128 512C121.6 512 115.5 509.5 111 504.1C106.5 500.5 104 494.4 104 488V272H96C72.67 271.1 50.29 262.7 33.79 246.2C17.29 229.7 8.017 207.3 8 184V24C8 17.63 10.53 11.53 15.03 7.029C19.53 2.529 25.63 0 32 0C38.37 0 44.47 2.529 48.97 7.029C53.47 11.53 56 17.63 56 24V144H104V25.6C104 19.23 106.5 13.13 111 8.629C115.5 4.129 121.6 1.6 128 1.6C134.4 1.6 140.5 4.129 144.1 8.629C149.5 13.13 152 19.23 152 25.6V144H200V24C200 17.63 202.5 11.53 207 7.029C211.5 2.529 217.6 0 224 0C230.4 0 236.5 2.529 240.1 7.029zM184.9 214.9C191.9 209 196.7 200.1 198.4 192H57.6C59.32 200.1 64.08 209 71.08 214.9C78.08 220.7 86.89 223.9 96 224H160C169.1 223.9 177.9 220.7 184.9 214.9z"/></svg>`
		},
		{
			name: 'Getränkekarte',
			href: '/admin/drinkmenu',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 576 512"><path d="M576 144c0 79.5-64.5 144-143.1 144c-27.38 0-52.75-8.125-74.62-21.38l35.25-35.25C404.8 236.8 418 240 432 240c52.88 0 95.1-43 95.1-96s-43.12-96-95.1-96c-35.38 0-65.1 19.5-82.62 48h-52.5c19.75-55.75 72.5-96 135.1-96C511.5 0 576 64.5 576 144zM320 488c0 13.25-10.75 24-24 24h-176C106.8 512 96 501.3 96 488s10.75-24 24-24h64v-117.3l-176.8-176.7C-8.249 154.5 2.751 128 24.63 128h366.7c21.88 0 32.87 26.5 17.37 42L232 346.8V464H296C309.3 464 320 474.8 320 488zM208 302.9L334.9 176H81.13L208 302.9z"/></svg>`
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
		},
		{
			name: 'Gästebuch',
			href: '/admin/guestbook',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>`
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
