<script lang="ts" context="module">
	export const load: import('./__types/__layout').Load = ({ url }) => {
		return {
			props: {
				url: url.pathname
			}
		};
	};
</script>

<script lang="ts">
	import { printIds } from './stores';
	import domtoimage from 'dom-to-image';

	export let url: string;

	const scale = 8;

	function print() {
		for (const printId of $printIds) {
			const node = document.getElementById(printId);
			if (!node) return;
			domtoimage
				.toBlob(node, {
					width: node.clientWidth * scale,
					height: node.clientHeight * scale,
					style: {
						transform: `scale(${scale})`,
						transformOrigin: 'top left'
					}
				})
				.then((blob) => {
					let a = document.createElement('a');
					let url = URL.createObjectURL(blob);
					a.href = url;
					a.download = printId + '.png';
					document.body.appendChild(a);
					a.click();
					setTimeout(function () {
						document.body.removeChild(a);
						window.URL.revokeObjectURL(url);
					}, 0);
				});
		}
	}

	$: backLink = url === '/prints' ? '/invitations' : '/prints';
	$: backTitle = url === '/prints' ? 'Zu den Einladungen' : 'Zurück';
	$: canPrint = url !== '/prints';
</script>

<div
	class="flex min-h-screen flex-col items-center justify-center gap-16 bg-gray-100 py-16 print:gap-0 print:bg-white print:p-0"
>
	<div class="fixed top-0 left-0 z-10 m-3 transition hover:scale-110 print:hidden">
		<a href={backLink} class="flex items-center gap-2">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-8 w-8"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 19l-7-7m0 0l7-7m-7 7h18"
				/>
			</svg>
			<span class="font-cheap-pine-sans text-4xl">{backTitle}</span>
		</a>
	</div>
	{#if canPrint}
		<div
			class="fixed top-0 right-0 z-10 m-3 transition hover:scale-110 print:hidden"
			on:click={() => print()}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-8 w-8"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
				/>
			</svg>
		</div>
	{/if}
	<slot />
</div>

<style global>
	* {
		-webkit-print-color-adjust: exact !important; /* Chrome, Safari, Edge */
		color-adjust: exact !important; /*Firefox*/
	}

	@media print {
		@page {
			size: A5;
			margin: 0;
		}
	}
</style>
