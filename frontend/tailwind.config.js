export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			scrollbar: ['rounded'], // optional if you want rounded scrollbars
		},
	},
	plugins: [
		require('tailwind-scrollbar')({ nocompatible: true }), // Enable custom scrollbar styles
	],
};
