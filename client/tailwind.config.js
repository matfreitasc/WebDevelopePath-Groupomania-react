module.exports = {
  content: [
    './public/**/*.html',
    './node_modules/flowbite/**/*.js',
    './src/**/*.{js,jsx,ts,tsx}',
  ],

  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        logoOrange: '#e94425',
      },
    },
    container: {
      center: true,

      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },

    variants: {
      extend: {},
    },
  },
  plugins: [require('flowbite/plugin')],
};
