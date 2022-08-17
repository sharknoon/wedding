<script lang="ts">
	export let currentPage: number;
	export let totalPages: number;
</script>

<div class="flex justify-between text-sm font-bold uppercase">
	<span class="text-left">Midrène's und Josua's Hochzeit</span>
	<span class="text-right"
		>Seite <span class="text-red-600">{currentPage}</span> / {totalPages}</span
	>
</div>
