/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"],
        montserrat: ["var(--font-montserrat)"],
        comforta: ["var(--font-comforta)"],
        gothic: ["var(--font-gothic)"],
      },
      colors: {
        primary: "#ffffff",
        secondary: "#E6E6E6",
      },
    },
    screens: {
      xxs: "360px",
      xss: "390px",
      xs: "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1200px",
      "2xl": "1440px",
      "3xl": "1700px",
      "4xl": "1920px",
    },
    container: {
      center: true,
      screens: {
        xss: "391px",
        xs: "450px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1440px",
        "3xl": "1700px",
      },
    },
  },
  plugins: [],
};
