/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '15': '3.75rem', 
      },
      colors: {
        background: '#c7fff3', 
        foreground: '158, 100%, 50%',
        nextButtonforeground: '0 0% 98%',
        nextButtonprimary: '130 50% 98%',
        nextButtonborder: '240 3.7% 15.9%'
      },
      animation: {
        ripple: "ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite",
      },
      keyframes: {
        ripple: {
          "0%, 100%": {
            transform: "translate(-50%, -50%) scale(1)",
          },
          "50%": {
            transform: "translate(-50%, -50%) scale(0.9)",
          },
        },
      },
    },
  },
  plugins: [],
}