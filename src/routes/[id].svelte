<script lang="ts">
	import type { Details, Invitation } from '../types';
	import Home from '../components/home.svelte';
	import Info from '../components/info.svelte';
	import Rsvp from '../components/rsvp.svelte';
	import Map from '../components/map.svelte';
	import FAQ from '../components/faq.svelte';

	export let invitation: Invitation;
	export let details: Details;
</script>

<!--
<div class="fixed z-10">
	<div class="sm:hidden">xs</div>
	<div class="hidden sm:block md:hidden">sm</div>
	<div class="hidden md:block lg:hidden">md</div>
	<div class="hidden lg:block xl:hidden">lg</div>
	<div class="hidden xl:block 2xl:hidden">xl</div>
	<div class="hidden 2xl:block">2xl</div>
</div>
-->
<div class="h-screen w-screen snap-y snap-proximity overflow-y-scroll">
	<Home />
	<Info {details} />
	<Rsvp {invitation} {details} />
	<!--<Program {details} />-->
	<Map />
	<FAQ {details} />
</div>
