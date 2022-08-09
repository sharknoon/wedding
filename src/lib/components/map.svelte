<script lang="ts">
	export let apiKey: string;
</script>

<iframe
	id="map"
	title="map"
	height="450"
	class="h-screen w-full snap-start border-none"
	loading="lazy"
	allowfullscreen
	src="https://www.google.com/maps/embed/v1/place?key={apiKey}&q=Pfrondorfer+Muehle&maptype=satellite"
/>
