/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        'OWL-base': '#EEF9FD',
        'OWL-orange': '#FBA834',
        'OWL-dark-blue': '#333A73',
        'OWL-mid-blue': '#387ADF',
        'OWL-light-blue': '#50C4ED',
      },
    },
  },
  plugins: [],
}

