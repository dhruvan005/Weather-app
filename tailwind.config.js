/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./dist/**/*.{html,js}"],
    theme: {
      extend: {
        colors: {
          mycolor: "rgba(255,255,255,0.3)",
          btn:"#0e64ed",
         
      }
    
      },
    },
    plugins: [],
  }