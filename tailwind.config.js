/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}', '*.{html,js}', './dist/**/*.{html,js}',"./node_modules/tw-elements/dist/js/**/*.js"],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
};
