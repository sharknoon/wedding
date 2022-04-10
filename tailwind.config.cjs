const plugin = require('tailwindcss/plugin');

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}', './src/routes/__layout.svelte'],
	theme: {
		fontFamily: {
			'display': ['"Cheap Pine Regular"'],
			'heading': ['"Cheap Pine Sans"'],
			'body': ['Oswald'],
		}
	},
	plugins: [
		require('@tailwindcss/forms'),
		plugin(function ({ addUtilities }) {
			const writingModeUtilities = {
				'.horizontal-tb': {
					writingMode: 'horizontal-tb'
				},
				'.vertical-rl': {
					writingMode: 'vertical-rl'
				},
				'.vertical-lr': {
					writingMode: 'vertical-lr'
				}
			};
			addUtilities(writingModeUtilities);
		})
	]
};
