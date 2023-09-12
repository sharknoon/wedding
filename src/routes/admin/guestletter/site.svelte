<script lang="ts">
	export let id: string;
	export let withFooter = true;
	export let that: HTMLElement;
</script>

<div {id} class="page h-[148mm] w-[105mm] bg-white p-[6mm] shadow-2xl" bind:this={that}>
	<div class="flex h-full max-h-full flex-col border-2 border-dashed border-gray-900 p-4">
		<slot />
		{#if withFooter}
			<span class="text-center text-sm tracking-widest text-gray-700">
				x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;
				x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x
			</span>
		{/if}
	</div>
</div>
