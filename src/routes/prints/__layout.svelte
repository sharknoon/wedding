<script lang="ts" context="module">
	export const load = ({ page }) => {
		return {
			props: {
				url: page.path
			}
		};
	};
</script>

<script>
	export let url;
	$: backLink = url === '/prints' ? '/invitation/jessica' : '/prints';
	$: backTitle = url === '/prints' ? 'Zur Hauptwebsite' : 'Zurück';
</script>

<div class="min-h-screen flex flex-col justify-center items-center gap-16 py-16 bg-gray-100">
	<div class="fixed top-0 left-0 m-3 transform hover:scale-110 transition z-10">
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
			<span class="text-5xl font-cheap-pine">{backTitle}</span>
		</a>
	</div>
	<slot />
</div>
