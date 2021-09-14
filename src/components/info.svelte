<script lang="ts">
	const date = new Date('2023-09-23T15:00:00+02:00');
	const location = 'Freudenstadt';
	const restaurant = 'Berghütte Lauterbad';

	const dateNow = new Date();
	const years = date.getFullYear() - dateNow.getFullYear();
	const months = date.getMonth() - dateNow.getMonth();
	const days = date.getDate() - dateNow.getDate();
	const hours = date.getHours() - dateNow.getHours();
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
			<span class="cd-number">{years}</span><span>{years === 1 ? 'Jahr' : 'Jahre'}</span>
		</div>
		<div class="countdown">
			<span class="cd-number">{months}</span><span>{months === 1 ? 'Monat' : 'Monate'}</span>
		</div>
		<div class="countdown">
			<span class="cd-number">{days}</span><span>{days === 1 ? 'Tag' : 'Tage'}</span>
		</div>
		<div class="countdown">
			<span class="cd-number">{hours}</span><span>{hours === 1 ? 'Stunde' : 'Stunden'}</span>
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
