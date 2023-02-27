<script lang="ts">
	import { details, invitation } from '$lib/client/stores';
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
		<Home />
		<Info />
		<Details />
		<!-- <Program /> -->
		<AboutUs />
		<Map />
		<FAQ />
	</div>
	<RSVP />
</div>
