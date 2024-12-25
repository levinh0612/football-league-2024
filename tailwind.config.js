/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Include all JS/TS/JSX/TSX files in the src folder
  ],
  theme: {
    extend: {
      fontFamily: {
        mpRegular: ['"MP-Regular"', 'sans-serif'],
        mpBold: ['"MP-Bold"', 'sans-serif'],
        ledCounter: ['"LedCounter"', 'sans-serif'],
        mamukaBold: ['"Mamuka-Bold"', 'sans-serif'],
        monoRegular: ['"MonoRegular"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}