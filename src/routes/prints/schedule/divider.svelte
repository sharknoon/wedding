<script lang="ts">
    export let direction = "down"
</script>

{#if direction === "down"}
<hr class="border-[3px] border-black my-1" />
<hr class="border border-black my-1" />
{:else}
<hr class="border border-black my-1" />
<hr class="border-[3px] border-black my-1" />
{/if}