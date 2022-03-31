<script lang="ts">
	import type { Details, Invitation } from '../../types';
	import Home from '../../components/home.svelte';
	import Info from '../../components/info.svelte';
	import Rsvp from '../../components/rsvp.svelte';
	import Program from '../../components/program.svelte';
	import Map from '../../components/map.svelte';
	import FAQ from '../../components/faq.svelte';

	export let invitation: Invitation;
	export let details: Details;
</script>

<div>
	<Home />
	<Info {details} />
	<Rsvp {invitation} {details} />
	<Program {details} />
	<Map />
	<FAQ {details} />
</div>
