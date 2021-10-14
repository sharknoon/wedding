<slot />

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	@font-face {
		font-family: 'Great Vibes';
		src: url('/fonts/greatvibes.woff2') format('woff2'),
			url('/fonts/greatvibes.woff') format('woff');
		font-weight: normal;
		font-style: normal;
	}
	@font-face {
		font-family: 'Montserrat';
		src: url('/fonts/montserrat.woff2') format('woff2'),
			url('/fonts/montserrat.woff') format('woff');
		font-weight: normal;
		font-style: normal;
	}

	html {
		@apply bg-yellow-50 select-none font-body;
	}
</style>
