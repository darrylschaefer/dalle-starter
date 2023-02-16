/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.jade", "./node_modules/flowbite/**/*.js", "./public/routes/*.js", "./public/javascripts/index.js"],
  theme: {
    extend: {
      spacing: {
  '320': '80rem',
},
screens: {
  'sm':'0px',
  'lg':'1340px'
}
    }
  },
  plugins: [
     require('flowbite/plugin')
 ],
}
