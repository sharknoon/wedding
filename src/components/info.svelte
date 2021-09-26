<script lang="ts">
	const date = new Date('2023-09-23T15:00:00+02:00');
	const location = 'Nagold';
	const restaurant = 'Pfrondorfer Mühle';

	const startDate = new Date(new Date().toISOString().substr(0, 10)); // need date in YYYY-MM-DD format
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
</script>

<div id="info" class="relative min-h-screen max-h-screen bg-no-repeat bg-cover bg-center">
	<div
		class="absolute top-8 w-full flex items-center flex-col min-h-screen max-h-screen font-body text-white filter drop-shadow-xl"
	>
		<div class="text-6xl md:text-8xl 2xl:text-9xl font-display">
			{date.toLocaleDateString(undefined, {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric'
			})}
		</div>
		<div class="text-xl md:text-4xl 2xl:text-5xl text-center">{restaurant}</div>
		<div class="uppercase text-xl">-{location}-</div>
		<div class="text-xl">
			{date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })} Uhr
		</div>
	</div>
	<div class="absolute flex justify-center bottom-8 w-full ">
		<div class="countdown">
			<span class="cd-number">{yearDiff}</span>
			<span class="cd-unit">{yearDiff === 1 ? 'Jahr' : 'Jahre'}</span>
		</div>
		<div class="countdown">
			<span class="cd-number">{monthDiff}</span>
			<span class="cd-unit">{monthDiff === 1 ? 'Monat' : 'Monate'}</span>
		</div>
		<div class="countdown">
			<span class="cd-number">{dayDiff}</span>
			<span class="cd-unit">{dayDiff === 1 ? 'Tag' : 'Tage'}</span>
		</div>
	</div>
</div>

<style lang="postcss">
	#info {
		background-image: url('/images/backgrounds/info.jpg');
	}
	.countdown {
		@apply flex flex-col items-center mx-4 border-2 border-gray-900 rounded font-body text-gray-900 p-3 bg-white/30 md:min-w-[7rem];
	}
	.cd-number {
		@apply font-display text-3xl md:text-6xl;
	}
	.cd-unit {
		@apply font-bold;
	}
</style>
