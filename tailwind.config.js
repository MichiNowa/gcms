/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: {
    relative: true,
    files: [
      "./assets/public/**/*.html",
      "./assets/public/**/*.js",
      "./assets/public/**/*.tsx",
      "./assets/public/**/*.mjs",
      "./assets/components/**/*.{php,html}",
      "./assets/layouts/**/*.{php,html}",
      "./assets/pages/**/*.{php,html}",
      "./assets/php/**/*.{php,html}",
      "./index.php",
    ],
  },
  theme: {
    fontFamily: {
      poppins: ['Poppins', 'sans-serif', '"Helvetica Neue"'],
      calibri: ['Calibri', 'sans-serif'],
      times: ['"Times New Roman"', 'serif'],
      arial: ['Arial', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}

