<script lang="ts">
	import { onMount } from 'svelte';
	import { details } from '$lib/client/stores';
	import { env } from '$env/dynamic/public';

	let apiKey = env.PUBLIC_GOOGLE_MAPS_API_KEY;
	let apiKeyAvailable = !!apiKey;

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

{#if apiKeyAvailable}
	<div id="map" class="h-full" />
{/if}
