<script lang="ts">
	import { totalPages } from './stores';
	let currentPage = 0;
	totalPages.update((totalPages) => {
		currentPage = totalPages + 1;
		return totalPages + 1;
	});
</script>

<div class="flex justify-between font-bold uppercase">
	<span class="flex-1 text-left">Midrène's und Josua's Hochzeit</span>
	<span class="flex-1 text-right">Seite {currentPage} / {$totalPages}</span>
</div>
