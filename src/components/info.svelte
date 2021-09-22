<script lang="ts">
	const date = new Date('2023-09-23T15:00:00+02:00');
	const location = 'Freudenstadt';
	const restaurant = 'Berghütte Lauterbad';

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

<div
	id="info"
	class="flex items-center justify-center flex-col bg-no-repeat bg-cover md:bg-center min-h-screen max-h-screen relative font-body text-white filter drop-shadow-xl"
>
	<div class="text-9xl font-display">
		{date.toLocaleDateString(undefined, {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		})}
	</div>
	<div class="text-5xl">{restaurant}</div>
	<div class="uppercase text-sm">-{location}-</div>
	<div class="mb-32">
		{date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })} Uhr
	</div>
	<div class="absolute bottom-8 grid grid-cols-4 gap-6">
		<div class="countdown">
			<span class="cd-number">{yearDiff}</span><span>{yearDiff === 1 ? 'Jahr' : 'Jahre'}</span>
		</div>
		<div class="countdown">
			<span class="cd-number">{monthDiff}</span><span>{monthDiff === 1 ? 'Monat' : 'Monate'}</span>
		</div>
		<div class="countdown">
			<span class="cd-number">{dayDiff}</span><span>{dayDiff === 1 ? 'Tag' : 'Tage'}</span>
		</div>
	</div>
</div>

<style lang="postcss">
	#info {
		background-image: url('/images/backgrounds/info.jpg');
	}
	.countdown {
		@apply flex flex-col items-center border rounded font-body text-gray-200 p-3 bg-white/30 filter drop-shadow-2xl;
	}
	.cd-number {
		@apply font-display text-6xl;
	}
</style>
