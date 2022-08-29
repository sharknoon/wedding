<script lang="ts">
	import { invitation, details } from '$lib/stores';
	import RSVP from './rsvp.svelte';
	import Home from './home.svelte';
	import Info from './info.svelte';
	import Details from './details.svelte';
	import Map from './map.svelte';
	import FAQ from './faq.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	invitation.set(data.invitation);
	if (data.details) {
		details.set(data.details);
	}
</script>

<div class="fixed inset-0 flex flex-col">
	<div class="grow snap-y snap-proximity overflow-y-scroll">
		<Home />
		<Info />
		<Details />
		<!--<Program {details} />-->
		<Map apiKey={data.googleMapsApiKey} />
		<FAQ />
	</div>
	<RSVP />
</div>
