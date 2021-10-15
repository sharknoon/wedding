module.exports = {
	content: ['./src/**/*.svelte', './src/routes/__layout.svelte'],
	theme: {
		fontFamily: {
			display: ['"Great Vibes"'],
			body: ['Montserrat']
		}
	},
	plugins: [require('@tailwindcss/forms')]
};
