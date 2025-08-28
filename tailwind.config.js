/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'light': {
          background: '#ffffff',
          text: '#000000',
          tint: '#2f95dc',
          tabIconDefault: '#cccccc',
          tabIconSelected: '#2f95dc',
          icon: '#000000',
        },
        'dark': {
          background: '#000000',
          text: '#ffffff',
          tint: '#ffffff',
          tabIconDefault: '#666666',
          tabIconSelected: '#ffffff',
          icon: '#ffffff',
        }
      }
    },
  },
  plugins: [],
}
