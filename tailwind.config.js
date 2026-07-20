/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
			},

			gridTemplateRows: {
				"[auto,auto,1fr]": "auto auto 1fr",
			},
		},
	},
	plugins: [
		require("@tailwindcss/forms"),
		require("tailwindcss-rtl"),
		require("@tailwindcss/aspect-ratio"),
	],
};
