<script lang="ts">
	import type { Details as D, Invitation } from '$lib/types';
	import { invitation as i, details as d } from '$lib/stores';
	import RSVP from '$lib/components/rsvp.svelte';
	import Home from '$lib/components/home.svelte';
	import Info from '$lib/components/info.svelte';
	import Details from '$lib/components/details.svelte';
	import Map from '$lib/components/map.svelte';
	import FAQ from '$lib/components/faq.svelte';

	export let invitation: Invitation;
	export let details: D;
	export let googleMapsApiKey: string;

	i.set(invitation);
	d.set(details);
</script>

<RSVP />
<div class="fixed h-full h-[100dvh] w-full snap-y snap-proximity overflow-y-scroll">
	<Home />
	<Info />
	<Details />
	<!--<Program {details} />-->
	<Map apiKey={googleMapsApiKey} />
	<FAQ />
</div>
