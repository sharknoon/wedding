<script lang="ts">
	import { details } from '$lib/client/stores';

	const icons: Record<string, string> = {
		eye: `<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 grow" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>`,
		cocktail: `<svg class="h-10 w-10 m-1 grow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M279.1 279.6l222.1-222C523.3 36.38 508.3 0 478.3 0H33.72c-30 0-45 36.38-23.75 57.63L128 175.7V176h.3359l103.6 103.6V463L220.8 464H152C138.8 464 128 474.8 128 488S138.8 512 152 512h208c13.25 0 24-10.75 24-24s-10.75-24-24-24h-78.09c-1.701-.2207-3.203-1-4.965-1h3.02V279.6zM443.7 48l-80 80h-215.5l-80-80H443.7zM255.1 235.8L196.2 176h119.5L255.1 235.8z"></path></svg>`,
		heart: `<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 grow" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>`,
		couple: `<svg class="h-10 w-10 grow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M159.1 96c26.5 0 47.1-21.5 47.1-48S186.5 0 160 0C133.5 0 111.1 21.5 111.1 48S133.5 96 159.1 96zM479.1 96c26.5 0 48-21.5 48-48S506.5 0 479.1 0c-26.5 0-47.1 21.5-47.1 48S453.5 96 479.1 96zM242.4 172.6C231.3 145.5 205.2 128 175.8 128H144.2C114.8 128 88.71 145.5 77.56 172.6L33.81 278.9C28.75 291.1 34.59 305.1 46.87 310.2c2.975 1.242 6.066 1.832 9.113 1.832c9.4 0 18.38-5.604 22.2-14.88l17.81-43.27V488c0 13.25 10.75 24 24 24s23.1-10.75 23.1-24V352h32v136c0 13.25 10.75 24 24 24c13.25 0 23.99-10.75 23.99-24V253.9l17.81 43.27C245.6 306.4 254.6 312 263.1 312c3.062 0 6.156-.5781 9.123-1.812c12.28-5.047 18.12-19.06 13.06-31.33L242.4 172.6zM143.1 304v-128h31.1l.002 128H143.1zM606.2 278.9l-43.75-106.3C551.3 145.5 525.2 128 495.8 128h-31.69c-29.31 0-55.44 17.5-66.59 44.58l-43.75 106.3c-5.062 12.27 .7813 26.28 13.06 31.33c2.877 1.205 5.846 1.771 8.764 1.771c7.957 0 15.57-4.205 20.09-11.14L367.1 384h47.1v104c0 13.25 10.75 24 24 24s23.1-10.75 23.1-24V384h31.1v104c0 13.25 10.75 24 24 24c13.25 0 23.99-10.75 23.99-24V384h48.01l-27.43-82.26C569.1 308.1 576.3 312 583.1 312c3.062 0 6.156-.5781 9.125-1.812C605.4 305.1 611.2 291.1 606.2 278.9zM434.6 336l45.4-136.2L525.4 336H434.6z"></path></svg>`,
		ring: `<svg class="h-10 w-10 grow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 64C109.1 64 0 125.9 0 208v98.13C0 384.5 114.6 448 256 448s256-63.5 256-141.9V208C512 125.9 401.1 64 256 64zM256 112c110.5 0 200 35.88 200 80c0 9.125-4 17.75-11 25.88C398.2 192.2 331 176 256 176S113.8 192.2 67 217.9C60 209.8 56 201.1 56 192C56 147.9 145.5 112 256 112zM397.8 248.5C361.5 263 311.4 272 256 272S150.5 263 114.2 248.5C149.1 234.2 198.4 224 256 224S361.1 234.2 397.8 248.5zM464 306.1C464 344.4 383 400 256 400s-208-55.63-208-93.88V266.4C94.38 298.8 170.1 320 256 320s161.6-21.25 208-53.63V306.1z"></path></svg>`,
		rings: `<svg class="h-10 w-10 grow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M371.9 147.7c10.13 18.5 17.75 38.37 22.38 59c41.13 21.25 69.63 63.75 69.63 113.2c0 70.75-57.25 128-128 128s-128-57.25-128-128c0-54.63 34.5-101.1 82.88-119.5c8.5 17.25 13 36.25 13.13 55.5c0 37.37-16.38 70.75-42 94.12c6.25 15.25 17.13 28.12 31 37c44.75-39.75 66.13-99.63 56.75-158.7c-9.375-59.25-48.25-109.5-103.1-133.5l41.38-66.25L232.4-16H119.4l-55.5 44.62l41.25 66.25C29.03 128.4-13.35 210.6 3.777 292.1s88.88 139.8 172.1 139.9c7.625-.125 15.25-.625 22.88-1.875c48.5 60.5 131 82.13 203 53.12c71.88-28.87 116.4-101.6 109.5-178.9S447.8 163.5 371.9 147.7zM127.9 39.37l8.5-7.375h79l8.5 7.375l-25.5 42.25c-14.88-2.125-30.13-2.125-45 0L127.9 39.37zM47.9 255.1c.125-70.62 57.38-127.9 128-128c33 0 62.88 12.88 85.63 33.5c-59.88 28-101.6 88-101.6 158.5c0 21.75 4.125 43.38 12 63.63C103.3 381.5 47.9 325.2 47.9 255.1z"></path></svg>`
	};

	$: gridTemplateColumns = `1fr${$details.milestones.map(() => ' 1fr auto 1fr')} 1fr`;
</script>

<div class="flex w-full flex-col justify-evenly">
	<h1 class="text-center font-cheap-pine text-3xl lg:text-5xl">Unsere gemeinsame Geschichte</h1>
	<div
		class="grid grid-rows-[1fr_1fr_auto_1fr_1fr] items-center"
		style:grid-template-columns={gridTemplateColumns}
	>
		<div class="relative col-start-1 row-start-3 py-4">
			<hr class="absolute inset-x-0 top-1/2 -translate-y-1/2 border border-black" />
		</div>
		<div
			class="relative row-start-3 py-4"
			style:grid-column-start={2 + $details.milestones.length * 3}
		>
			<hr class="absolute inset-x-0 top-1/2 -translate-y-1/2 border border-black" />
		</div>

		{#each $details.milestones as milestone, i}
			{@const date = new Date(milestone.date)}
			<div class="relative col-span-3 row-start-3 py-2" style:grid-column-start={i * 3 + 2}>
				<div class="mx-auto h-3 w-3 rounded-full bg-black lg:h-4 lg:w-4" />
				<hr class="absolute inset-x-0 top-1/2 -translate-y-1/2 border border-black" />
			</div>
			<div
				class="mx-auto h-5/6 w-[0.175rem] bg-black
                 {i % 2 === 0 ? 'row-start-2' : 'row-start-4'}"
				style:grid-column-start={i * 3 + 3}
			/>

			<div
				class="col-span-5 mx-auto flex min-w-[5rem] flex-col justify-center text-center lg:min-w-[10rem]
                {i % 2 === 0 ? 'row-start-4' : 'row-start-2'}"
				style:grid-column-start={Math.max(i * 3 + 1, 1)}
			>
				<span class="font-cheap-pine text-6xl leading-[0.9] lg:text-7xl">{date.getDate()}</span>
				<span
					class="bg-black px-1 font-cheap-pine-sans text-lg !leading-none tracking-wider text-white lg:text-3xl"
				>
					{date.toLocaleDateString('DE-DE', {
						month: 'long'
					})}
				</span>
				<div class="flex justify-between font-cheap-pine-sans text-3xl font-bold lg:text-5xl">
					{#each date.getFullYear().toString().split('') as num}
						<span>{num}</span>
					{/each}
				</div>
			</div>
			<div
				class="relative col-span-5 {i % 2 === 0
					? 'row-start-1'
					: 'row-start-5'} mx-auto h-[6.5rem] w-[5.5rem] lg:h-36 lg:w-28"
				style:grid-column-start={Math.max(i * 3 + 1, 1)}
			>
				<div class="absolute bottom-0 left-2 right-0 top-2 border-4 border-red-600 bg-white" />
				<div
					class="absolute bottom-2 left-0 right-2 top-0 flex flex-col items-center border-4 border-black bg-white ring-2 ring-white"
				>
					{@html icons[milestone.image]}
					<span class="self-stretch bg-black text-center text-sm text-white lg:text-lg">
						{milestone.title}
					</span>
				</div>
			</div>
		{/each}
	</div>
	<div />
</div>
