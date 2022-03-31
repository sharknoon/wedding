<script lang="ts" context="module">
	export const load = ({ url }) => {
		return {
			props: {
				url: url.pathname
			}
		};
	};
</script>

<script>
	export let url;
	$: backLink = url === '/prints' ? '/invitation/jessica' : '/prints';
	$: backTitle = url === '/prints' ? 'Zur Hauptwebsite' : 'Zurück';
</script>

<div class="flex min-h-screen flex-col items-center justify-center gap-16 bg-gray-100 py-16">
	<div class="fixed top-0 left-0 z-10 m-3 transition hover:scale-110">
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
			<span class="font-cheap-pine text-5xl">{backTitle}</span>
		</a>
	</div>
	<div class="fixed top-0 right-0 z-10 m-3 transition hover:scale-110">
		<a href={backLink}>
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
		</a>
	</div>
	<slot />
</div>
