/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html, js, ts, vue}", 
    "./src/**/*"
],
  theme: {
  
    extend: {
      colors: {
        transparentBlack:"rgba(0,0,0,0.85)",
      }
    },
    screens:{
      xs:"480px",
      sm:"768px",
      md:"1060px"
    },
  },
  plugins: [],
}

