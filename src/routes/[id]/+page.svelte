<script lang="ts">
	import { invitation, details } from '$lib/stores';
	import RSVP from '$lib/components/rsvp.svelte';
	import Home from '$lib/components/home.svelte';
	import Info from '$lib/components/info.svelte';
	import Details from '$lib/components/details.svelte';
	import Map from '$lib/components/map.svelte';
	import FAQ from '$lib/components/faq.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	invitation.set(data.invitation);
	details.set(data.details);
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
