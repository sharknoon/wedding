<script lang="ts">
	function scrollDown() {
		const element = document.querySelector('#info');
		if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
</script>

<div
	id="home"
	class="flex items-center justify-center bg-no-repeat bg-cover md:bg-center min-h-screen max-h-screen relative"
>
	<div class="filter drop-shadow-xl">
		<h1
			class="text-center font-display font-semibold text-6xl md:text-8xl 2xl:text-9xl text-gray-200"
		>
			Midrène
		</h1>
		<p
			class="text-center font-display font-semibold text-3xl md:text-4xl 2xl:text-6xl text-gray-200"
		>
			und
		</p>
		<h1
			class="text-center font-display font-semibold text-6xl md:text-8xl 2xl:text-9xl text-gray-200 pt-2 mb-32"
		>
			Josua
		</h1>
	</div>
	<button on:click={scrollDown} class="absolute bottom-12 opacity-80 text-gray-200">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-12 w-12 animate-bounce"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
		</svg>
	</button>
</div>

<style>
	#home {
		background-image: url('/images/backgrounds/home.png');
	}
</style>
