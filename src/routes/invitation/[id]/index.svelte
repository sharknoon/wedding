<script lang="ts" context="module">
	export const load = ({ params }) => {
		return {
			props: {
				id: params.id
			}
		};
	};
</script>

<script lang="ts">
	export let id: string;

	import Overlay from '../../../components/overlay.svelte';
	import Home from '../../../components/home.svelte';
	import Info from '../../../components/info.svelte';
	import Rsvp from '../../../components/rsvp.svelte';
	import Program from '../../../components/program.svelte';
	import Map from '../../../components/map.svelte';
	import FAQ from '../../../components/faq.svelte';

	$: wedding = null;
	$: loading = true;
	$: error = null;
	fetch(`https://midrene-und-josua.de/api/invitation/${id}`)
		.then((response) => {
			if (!response.ok) {
				switch (response.status) {
					case 404:
						error = 'Einladung konnte nicht gefunden werden';
						break;
					case 400:
						error = 'Fehlende ID der Einladung';
					default:
						error = 'Unbekannter Fehler';
						break;
				}
			} else {
				response
					.json()
					.then((w) => {
						wedding = w;
					})
					.catch((e) => {
						error = 'Einladung konnte nicht gelesen werden';
						console.error(e);
					});
			}
		})
		.catch((e) => {
			error = 'Einladung konnte nicht geladen werden';
			console.error(e);
		})
		.finally(() => {
			loading = false;
		});
</script>

<!-- Disables scrolling when no invitation is present -->
<div style:overflow={wedding ? 'auto' : 'hidden'} style:height={wedding ? 'auto' : '100vh'}>
	<Home />
	<Info {wedding} />
	<Rsvp {wedding} />
	<Program {wedding} />
	<Map />
	<FAQ {wedding} />
	{#if !wedding}
		<Overlay {loading} {error} />
	{/if}
</div>
