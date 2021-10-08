<script lang="ts" context="module">
	export const load = ({ page }) => {
		return {
			props: {
				id: page.params.id
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
	import FAQ from '../../../components/faq.svelte';

	$: invitation = null;
	$: loading = true;
	$: error = null;
	fetch(`https://midrene-und-josua.de/api/invitation/${id}`).then((response) => {
		loading = false;
		if (!response.ok) {
			switch (response.status) {
				case 404:
					error = 'Einladung konnte nicht gefunden werden';
					break;
				case 400:
					error = 'Fehlende ID der Einladung';
				default:
					error = 'Einladung konnte nicht geladen werden';
					break;
			}
		} else {
			response.json().then((i) => {
				invitation = i;
			});
		}
	});
</script>

<!-- Disables scrolling when no invitation is present -->
<div class={invitation === null ? 'overflow-hidden h-screen' : ''}>
	<Home />
	<Info />
	<Rsvp {invitation} />
	<FAQ />

	{#if invitation === null}
		<Overlay {loading} {error} />
	{/if}
</div>
