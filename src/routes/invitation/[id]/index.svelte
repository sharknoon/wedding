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

	import Home from '../../../components/home.svelte';
	import Info from '../../../components/info.svelte';
	import Rsvp from '../../../components/rsvp.svelte';
</script>

<Home />
<Info />
<Rsvp {id} />
