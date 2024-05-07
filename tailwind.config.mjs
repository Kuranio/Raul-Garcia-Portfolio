/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			scale: {
				'-100': '-1',
			},
			colors: {
				'dark': '#212121',
				'light': '#e1dfdd',
			},
		},
	},
	plugins: [],
}
