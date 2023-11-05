const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}', './src/routes/__layout.svelte'],
	theme: {
		fontFamily: {
			'cheap-pine': ['"Cheap Pine Regular"'],
			'cheap-pine-sans': ['"Cheap Pine Sans"'],
			oswald: ['Oswald']
		},
		screens: {
			xs: '250px',
			...defaultTheme.screens,
			'3xl': '1815px',
			'4xl': '2100px',
			'5xl': '2350px',
			'6xl': '2600px',
			'7xl': '2850px',
			'8xl': '3100px',
			'9xl': '3350px',
			'10xl': '3600px',
			'11xl': '3850px',
			'12xl': '4100px'
		}
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		plugin(function ({ addUtilities }) {
			addUtilities({
				'.horizontal-tb': {
					writingMode: 'horizontal-tb'
				},
				'.vertical-rl': {
					writingMode: 'vertical-rl'
				},
				'.vertical-lr': {
					writingMode: 'vertical-lr'
				}
			});
		})
	]
};
