/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.{html,js}',
    './src/**/*.{html,js}'
  ],
  theme: {
    container: {
      center: true,
      padding: "12px",
    },
    extend: {
      colors:{
        "primary": "#00807E",
        "secondary": "#818A91",
        "pale":{
          "100": "#FAFAFA",
          "200": "#CED4DA",
          "300": "#00000029",
          "400": "#F7F7F7",
        },
        "forest":{
          "100": "#64C3BF",
          "200": '#007572',
        }
      },
      borderWidth: {
        '3': '3px',
      },
      spacing:{
        "15":"60px",
        "350": "350px"
      },
      fontSize:{
        "3.5xl": ["32px","43px"]
      },
      boxShadow: {
        '3': '0 3px 6px 0px rgba(0, 0, 0, 0.16)',
      },
      
    },
  },
  plugins: [],
}
