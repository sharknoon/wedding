<script lang="ts">
	import type { CountdownItem, Details } from '$lib/types';
	export let details: Details;

	$: date = new Date(details?.date || null);
	$: countdown = calculateCountdown(date);

	function calculateCountdown(date: Date): CountdownItem[] {
		if (!date) {
			return [];
		}
		const startDate = new Date(new Date().toISOString().substr(0, 10));
		const endDate = new Date(date.toISOString().substr(0, 10));

		const startYear = startDate.getFullYear();
		const february =
			(startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
		const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

		var yearDiff = endDate.getFullYear() - startYear;
		var monthDiff = endDate.getMonth() - startDate.getMonth();
		if (monthDiff < 0) {
			yearDiff--;
			monthDiff += 12;
		}
		var dayDiff = endDate.getDate() - startDate.getDate();
		if (dayDiff < 0) {
			if (monthDiff > 0) {
				monthDiff--;
			} else {
				yearDiff--;
				monthDiff = 11;
			}
			dayDiff += daysInMonth[startDate.getMonth()];
		}
		return [
			{ unit: yearDiff === 1 ? 'Jahr' : 'Jahre', value: yearDiff },
			{ unit: monthDiff === 1 ? 'Monat' : 'Monate', value: monthDiff },
			{ unit: dayDiff === 1 ? 'Tag' : 'Tage', value: dayDiff }
		];
	}

	$: year = date.toLocaleDateString('de-DE', {
		year: 'numeric'
	});
</script>

<div
	id="info"
	class="relative flex min-h-screen snap-start flex-col justify-between gap-8 bg-cover bg-center bg-no-repeat p-8"
	style="background-image: url('/images/backgrounds/info.jpg')"
>
	<div class="flex w-full justify-center">
		<div
			class="flex flex-col divide-y-2 divide-black border-4 border-black bg-white p-2 font-heading"
		>
			<div class="flex items-center divide-x-2 divide-black pb-2">
				<span class="pr-2 font-display text-8xl">
					{date.toLocaleDateString(undefined, {
						day: '2-digit'
					})}
				</span>
				<div class="flex grow flex-col pl-2 text-center">
					<span class="bg-black px-1 font-heading text-4xl leading-none tracking-widest text-white">
						{date.toLocaleDateString('de-DE', {
							month: 'long'
						})}
					</span>
					<span class="flex justify-between font-heading text-6xl font-bold">
						{#each year?.split('') as c}
							<div>{c}</div>
						{/each}
					</span>
				</div>
			</div>
			<div class="py-1 text-center text-3xl md:text-4xl 2xl:text-5xl">
				{details?.locationName}
			</div>
			<div class="flex w-full divide-x-2 divide-black pt-2 text-center font-body text-lg">
				<div class="flex-auto pr-1">{details?.street}</div>
				<div class="flex-auto px-1">{details?.city}</div>
				<div class="flex-auto pl-1">
					{date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })} Uhr
				</div>
			</div>
		</div>
	</div>
	<div class="flex w-full justify-center gap-4">
		{#each countdown as c}
			{#if c.value > 0}
				<div
					class="flex aspect-square min-w-[6rem] flex-col items-center justify-center border-4 border-black bg-white font-heading md:min-w-[7rem]"
				>
					<span class="font-display text-5xl md:text-6xl">{c.value}</span>
					<span class="text-2xl md:text-3xl">{c.unit}</span>
				</div>
			{/if}
		{/each}
	</div>
</div>
