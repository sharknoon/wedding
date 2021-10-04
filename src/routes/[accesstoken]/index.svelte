<script lang="ts" context="module">
	export const load = ({ page }) => {
		return {
			props: {
				accesstoken: page.params.accesstoken
			}
		};
	};
</script>

<script lang="ts">
	export let accesstoken;

	import Home from '../../components/home.svelte';
	import Info from '../../components/info.svelte';
	import Rsvp from '../../components/rsvp.svelte';
</script>

{accesstoken}
<Home />
<Info />
<Rsvp />
