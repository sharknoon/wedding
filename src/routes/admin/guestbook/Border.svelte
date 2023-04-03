<script lang="ts">
	export let site: 'left' | 'right';
</script>

<div
	class="h-[303mm] w-[216mm] max-w-[216mm] bg-white py-[13mm] shadow-2xl {site === 'left'
		? 'pl-[13mm] pr-[20mm]'
		: 'pl-[20mm] pr-[13mm]'}"
>
	<div class="flex h-full flex-col border-2 border-dashed border-gray-900 p-4">
		<slot />
	</div>
</div>
