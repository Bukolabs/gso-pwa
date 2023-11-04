/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "caribbean-green": {
          50: "#ebfef6",
          100: "#cefde7",
          200: "#a2f8d4",
          300: "#66efbf",
          400: "#29dea4",
          500: "#05cc93",
          600: "#00a074",
          700: "#008060",
          800: "#00654e",
          900: "#015341",
          950: "#002f25",
        },
      },
    },
  },
  plugins: [],
};
