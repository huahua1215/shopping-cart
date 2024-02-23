/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      l: "1.05rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
      "20px": "20px",
      "18px": "18px",
      "16px": "16px",
      "14px": "14px",
      "12px": "12px",
      "0.4em": " 0.4em",
    },
    extend: {
      colors: {
        lightGray: "rgb(242, 242, 242)",
        lightRed: "#ef8a8b",
        lightWhite: "rgba(255, 255, 255, 0.8)",
        c2c2c2: "#c2c2c2",
        b6b6b6: "#b6b6b6",
        959595: "#959595",
        f9f9f9: "#f9f9f9",
      },
      padding: {
        "5px": "5px",
        "20px": "20px",
        "`5px": "15px",
        "30px": "30px",
      },
      margin: {
        base: "1rem",
        "110px": "110px",
        "20px": "20px",
      },
      boxShadow: {
        table: "0 0 10px rgba(0, 0, 0, 0.1)",
        infoBox: " 0 0 10px rgba(0, 0, 0, 0.1)",
      },
      width: {
        "90%": "90%",
      },
    },
  },
  plugins: [],
};
