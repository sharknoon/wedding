<script lang="ts">
	import type { CountdownItem, Details } from '$lib/types';
	export let details: Details;

	$: date = new Date(details?.date);
	$: countdown = calculateCountdown(date);

	function calculateCountdown(date: Date): CountdownItem[] {
		if (!date) {
			return [];
		}
		const startDate = new Date(new Date().toISOString().substring(0, 10));
		const endDate = new Date(date.toISOString().substring(0, 10));

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

<div id="info" class="relative min-h-screen snap-start">
	<picture>
		<source srcset="/images/backgrounds/info.avif" type="image/avif" />
		<img
			class="absolute h-full w-full object-cover"
			src="/images/backgrounds/info.jpg"
			alt="info"
		/>
	</picture>
	<div class="flex h-screen flex-col justify-between gap-8 p-2">
		<div class="relative flex w-full justify-center">
			<div
				class="flex flex-col divide-y-2 divide-black border-4 border-black bg-white p-2 font-cheap-pine-sans"
			>
				<div class="flex items-center divide-x-2 divide-black pb-2">
					<span class="pr-2 font-cheap-pine text-8xl">
						{date.toLocaleDateString(undefined, {
							day: '2-digit'
						})}
					</span>
					<div class="flex grow flex-col pl-2 text-center">
						<span
							class="bg-black px-1 font-cheap-pine-sans text-4xl leading-none tracking-widest text-white"
						>
							{date.toLocaleDateString('de-DE', {
								month: 'long'
							})}
						</span>
						<span class="flex justify-between font-cheap-pine-sans text-6xl font-bold">
							{#each year?.split('') as c}
								<div>{c}</div>
							{/each}
						</span>
					</div>
				</div>
				<div class="py-1 text-center text-3xl md:text-4xl 2xl:text-5xl">
					{details?.locationName}
				</div>
				<div class="flex w-full divide-x-2 divide-black pt-2 text-center font-oswald text-lg">
					<div class="flex-auto pr-1">{details?.street}</div>
					<div class="flex-auto px-1">{details?.city}</div>
					<div class="flex-auto pl-1">
						{date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })} Uhr
					</div>
				</div>
			</div>
		</div>
		<div class="relative flex w-full justify-center gap-4">
			{#each countdown as c}
				<div
					class="flex aspect-square min-w-[6rem] flex-col items-center justify-center border-4 border-black bg-white font-cheap-pine-sans md:min-w-[7rem]"
				>
					<span class="font-cheap-pine text-5xl md:text-6xl">{c.value}</span>
					<span class="text-2xl md:text-3xl">{c.unit}</span>
				</div>
			{/each}
		</div>
	</div>
</div>
