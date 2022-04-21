<script lang="ts">
	const GOOGLE_MAPS_API_KEY = process?.env.GOOGLE_MAPS_API_KEY;
	if (!GOOGLE_MAPS_API_KEY) {
		throw new Error('Missing GOOGLE_MAPS_API_KEY environment variable');
	}
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
