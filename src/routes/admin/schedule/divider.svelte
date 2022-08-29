<script lang="ts">
	export let direction = 'down';
</script>

{#if direction === 'down'}
	<hr class="my-1 border-[2px] border-black" />
	<hr class="my-1 border border-black" />
{:else}
	<hr class="my-1 border border-black" />
	<hr class="my-1 border-[2px] border-black" />
{/if}
