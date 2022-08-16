/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark_background: "#191919",
        light_background: "#feffde",
        dark_content_background: "#323232",
        light_content_background: "#fff",
        dark_text: "#fff",
        light_text: "#000",
        light_tertiary: "#52734d",
        dark_tertiary: "#1e5128",
        light_accent: "#91c788",
        dark_accent: "#2b8c57",
      },
    },
  },
  plugins: [],
};
