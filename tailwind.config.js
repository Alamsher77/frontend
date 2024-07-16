// tailwind.config.js
module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow:{
        "3xl":'0 2px  10px gray'
      } 
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
