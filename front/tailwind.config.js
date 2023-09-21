/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {keyframes: {
      topDown: {
        '0%': { opacity:'10%',top: '4rem' },
        '100%': { opacity:'100%',top: '7.1rem' }
      },
      backup: {
        '0%': { opacity:'10%',top: '4rem' },
        '100%': { opacity:'10%',top: '4rem' }
      },
      
    },
    animation: {
      topDown: 'topDown .2s ease-in-out',
      backup: 'backup .2s ease-in-out',
    }},
  },
  plugins: [],
}

