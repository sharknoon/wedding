<script lang="ts">
	import { onMount } from 'svelte';
	import { details } from '$lib/stores';

	export let apiKey: string;

	onMount(() => {
		setTimeout(function () {
			var map = document.getElementById('map');
			var frame = document.createElement('iframe');
			frame.src = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(
				$details.locationName
			)}&maptype=satellite`;
			frame.className += 'h-full w-full snap-start border-none';
			frame.allowFullscreen = true;
			frame.title = 'map';
			map?.appendChild(frame);
		}, 1500);
	});
</script>

<div id="map" class="h-full" />
