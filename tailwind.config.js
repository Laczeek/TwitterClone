/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

export default {
	darkMode: 'class',
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				'sans': ['Roboto, sans-serif']
			}
		},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			blue: '#1DA1F2',
			black: '#14171A',
			white: colors.white,
			gray: {
				border: '#4b4f52',
				dark: '#1f2329',
				light: '#6f767a',
				extraLight: '#E1E8ED',
				superLight: '#F5F8FA',
			},
			background: {
				white: '#fffefe',
				black: '#000000',
			},
			icons: {
				blue: '#1DA1F2',
				red: '#da2677',
				green: '#4CBB17',
			},
		},
		
	},
	plugins: [],
};
