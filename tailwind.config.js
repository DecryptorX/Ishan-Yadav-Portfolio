module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090B',
        surface: '#111111',
        accent: '#00E5FF',
        secondary: '#6366F1',
        glow: '#00e5ff33'
      },
      spacing: {
        '128': '32rem', // Custom spacing
        '144': '36rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Custom font family
      },
    },
  },
  safelist: [
    'inline-flex','items-center','justify-center','rounded-md','px-4','py-2','font-medium','transition','mx-auto','px-4','py-16'
  ],
  plugins: [require('@tailwindcss/forms')],
}