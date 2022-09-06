<script lang="ts">
	import '../app.css';
	import { details } from '$lib/stores';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	if (data.details) {
		details.set(data.details);
	}
</script>

<slot />
