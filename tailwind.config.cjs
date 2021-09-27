module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.svelte', './src/routes/__layout.svelte'],
	theme: {
		fontFamily: {
			display: ['"Great Vibes"'],
			body: ['Montserrat']
		},
		extend: {}
	},
	plugins: [require('@tailwindcss/forms')]
};
