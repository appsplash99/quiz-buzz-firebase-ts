module.exports = {
  purge: ['./index.html', './src/**/*.{js, jsx, ts, tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        '12/25': '48%',
      },
      boxShadow: {
        'play-quiz-box': '0 5px 12px -2px rgb(0 0 0 / 40%)',
        'quiz-options':
          'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
      },
    },
  },
  plugins: [],
};
