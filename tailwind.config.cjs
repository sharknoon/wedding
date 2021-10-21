const plugin = require('tailwindcss/plugin')

module.exports = {
	content: ['./src/**/*.svelte', './src/routes/__layout.svelte'],
	theme: {
		fontFamily: {
			display: ['"Great Vibes"'],
			body: ['Montserrat'],
			"cheap-pine-sans": ['"Cheap Pine Sans"'],
			"cheap-pine": ['"Cheap Pine Regular"'],
		}
	},
	plugins: [
		require('@tailwindcss/forms'),
		plugin(function ({ addUtilities }) {
			const writingModeUtilities = {
				'.horizontal-tb': {
					writingMode: 'horizontal-tb',
				},
				'.vertical-rl': {
					writingMode: 'vertical-rl'
				},
				'.vertical-lr': {
					writingMode: 'vertical-lr'
				}
			}
			addUtilities(writingModeUtilities)
		})
	]
};
