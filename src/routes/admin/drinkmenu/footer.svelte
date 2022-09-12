<script lang="ts">
	import { details } from '$lib/stores';

	$: date = new Date($details.date);
</script>

<div class="my-2 flex items-center divide-x-2 divide-black">
	<span class="pr-2 font-cheap-pine text-7xl">
		{date.toLocaleDateString('DE-DE', {
			day: '2-digit'
		})}</span
	>
	<div class="flex flex-col px-2 text-center">
		<span
			class="bg-black px-1 font-cheap-pine-sans text-2xl leading-none tracking-widest text-white"
		>
			{date.toLocaleDateString('DE-DE', {
				month: 'long'
			})}
		</span>
		<span class="font-cheap-pine-sans text-5xl font-bold leading-[0.85] tracking-widest"
			>{date.toLocaleDateString('DE-DE', {
				year: 'numeric'
			})}</span
		>
	</div>
	<div class="flex grow flex-col text-center">
		<span class="font-cheap-pine-sans text-2xl leading-none tracking-widest">
			Midrène's und Josua's
		</span>
		<div class="flex items-center justify-between px-3">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-9 w-9 text-red-600"
				viewBox="0 0 20 20"
				fill="currentcolor"
			>
				<path d="M20 7h-7L10 .5 7 7H0l5.46 5.47-1.64 7 6.18-3.7 6.18 3.73-1.63-7z" />
			</svg>
			<span class="font-cheap-pine text-4xl tracking-widest">Hochzeit</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-9 w-9 text-red-600"
				viewBox="0 0 20 20"
				fill="currentcolor"
			>
				<path d="M20 7h-7L10 .5 7 7H0l5.46 5.47-1.64 7 6.18-3.7 6.18 3.73-1.63-7z" />
			</svg>
		</div>
	</div>
</div>
