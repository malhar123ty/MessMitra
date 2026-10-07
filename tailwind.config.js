/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Plus Jakarta Sans", "Inter", "sans-serif"],
        sans: ["Inter", "Plus Jakarta Sans", "sans-serif"]
      },
      colors: {
        brand: {
          blue: "#0077ff",
          blueHover: "#0062d6",
          blueLight: "#e6f1ff",
          orange: "#ff7a00",
          orangeHover: "#e66e00",
          orangeLight: "#fff3e6",
          navy: "#0a1122"
        }
      }
    },
  },
  plugins: [],
}
