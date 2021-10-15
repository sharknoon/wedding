<script lang="ts">
	import type { Wedding } from '../types';
	export let wedding: Wedding;

	$: date = new Date(wedding?.details?.date || null);
	$: countdown = calculateCountdown(date);

	function calculateCountdown(date: Date) {
		if (!date) {
			return [0, 0, 0];
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
		return [yearDiff, monthDiff, dayDiff];
	}
</script>

<div id="info" class="relative min-h-screen bg-no-repeat bg-cover bg-center">
	<div class="absolute top-8 w-full flex justify-center">
		<div class="flex items-center flex-col bg-black/50 rounded-lg border-2 border-red-600 p-4">
			<div class="text-6xl md:text-8xl 2xl:text-9xl font-display">
				{date.toLocaleDateString(undefined, {
					day: '2-digit',
					month: '2-digit',
					year: 'numeric'
				})}
			</div>
			<div class="text-xl md:text-4xl 2xl:text-5xl text-center">
				{wedding?.details?.locationParty}
			</div>
			<div class="w-full flex divide-x-2 divide-red-600">
				<div class="flex-auto text-xl text-center pr-2">{wedding?.details?.streetParty}</div>
				<div class="flex-auto text-xl text-center px-2">{wedding?.details?.cityParty}</div>
				<div class="flex-auto text-xl text-center pl-2">
					{date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })} Uhr
				</div>
			</div>
		</div>
	</div>
	<div class="absolute flex justify-center bottom-12 w-full">
		<div class="countdown">
			<span class="cd-number">{countdown[0]}</span>
			<span class="cd-unit">{countdown[0] === 1 ? 'Jahr' : 'Jahre'}</span>
		</div>
		<div class="countdown">
			<span class="cd-number">{countdown[1]}</span>
			<span class="cd-unit">{countdown[1] === 1 ? 'Monat' : 'Monate'}</span>
		</div>
		<div class="countdown">
			<span class="cd-number">{countdown[2]}</span>
			<span class="cd-unit">{countdown[2] === 1 ? 'Tag' : 'Tage'}</span>
		</div>
	</div>
</div>

<style lang="postcss">
	#info {
		background-image: url('/images/backgrounds/info.webp');
	}
	.countdown {
		@apply flex flex-col items-center border-2 border-red-600 rounded-lg bg-black/50 mx-4 p-3 md:min-w-[7rem];
	}
	.cd-number {
		@apply font-display font-bold text-3xl md:text-6xl;
	}
	.cd-unit {
		@apply font-bold;
	}
</style>
