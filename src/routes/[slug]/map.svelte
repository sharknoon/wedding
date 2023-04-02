<script lang="ts">
	import { details } from '$lib/client/stores';
	import { env } from '$env/dynamic/public';

	let apiKey = env.PUBLIC_GOOGLE_MAPS_API_KEY;
</script>

{#if apiKey}
	<iframe
		src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(
			$details.locationName
		)}&maptype=satellite`}
		loading="lazy"
		title="Map"
		allow="fullscreen"
		class="h-full w-full border-none"
	/>
{/if}
