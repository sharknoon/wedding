<script lang="ts">
	import { details, invitation } from '$lib/client/stores';
	import Section from './section.svelte';
	import RSVP from './rsvp.svelte';
	import Home from './home.svelte';
	import Info from './info.svelte';
	import Details from './details.svelte';
	import Map from './map.svelte';
	import FAQ from './faq.svelte';
	import type { PageData } from './$types';
	//import Program from './program.svelte';
	import AboutUs from './about-us.svelte';

	export let data: PageData;

	details.set(data.details);
	invitation.set(data.invitation);
</script>

<div class="fixed inset-0 flex flex-col">
	<div class="grow snap-y snap-proximity overflow-y-scroll">
		<Section name="home" scrollTo="info">
			<Home />
		</Section>
		<Section name="info" scrollTo="rsvp" color="text-white">
			<Info />
		</Section>
		<Section name="rsvp" scrollTo="faqs">
			<Details />
		</Section>
		<!-- <Program /> -->
		<Section name="faqs" scrollTo="map">
			<FAQ />
		</Section>
		<Section name="map" scrollTo="about-us">
			<Map />
		</Section>
		<Section name="about-us">
			<AboutUs />
		</Section>
	</div>
	<RSVP />
</div>
