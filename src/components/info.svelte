<script lang="ts">
	const date = new Date('2023-09-23T15:00:00+02:00');
	const location = 'Freudenstadt';
	const restaurant = 'Berghütte Lauterbad';
</script>

<div
	id="info"
	class="flex items-center justify-center flex-col bg-no-repeat bg-cover md:bg-center min-h-screen max-h-screen"
>
	<div>
		{date.toLocaleDateString(undefined, {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		})}
	</div>
	<div class="uppercase">-{location}-</div>
	<div>{restaurant}</div>
	<div>{date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })} Uhr</div>
	<div>Noch {((date.getTime() - new Date().getTime()) / 1000 / 60 / 60 / 24).toFixed(0)} Tage</div>
</div>

<style>
	#home {
		background-image: url('/images/backgrounds/home.png');
	}
</style>
