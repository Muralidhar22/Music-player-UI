/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}",],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      basier: ["BasierCircle", "sans-serif"]
    },
    extend: {
      width: {
        128: "45rem"
      }
    },
  },
  plugins: [],
}

