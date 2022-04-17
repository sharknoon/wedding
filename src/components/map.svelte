<script lang="ts">
	import { GOOGLE_MAPS_API_KEY } from '$lib/env';
</script>

<iframe
	id="map"
	title="map"
	height="450"
	class="h-screen w-full snap-start border-none"
	loading="lazy"
	allowfullscreen
	src="https://www.google.com/maps/embed/v1/place?key={GOOGLE_MAPS_API_KEY}&q=Pfrondorfer+Muehle&maptype=satellite"
/>
