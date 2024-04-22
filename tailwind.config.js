const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#FF800B',
          700: '#C96508',
        },
      },
      fontFamily: {
        title: ['Poppins', 'Noto Sans JP', ...defaultTheme.fontFamily.sans],
        content: ['Open Sans', 'Noto Sans JP', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
