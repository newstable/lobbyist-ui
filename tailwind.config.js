module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        "screen-lgx": "1100px",
      },
      minWidth: {
        15: "15rem",
      },
    },
    container: {
      screens: {
        sm: "100%",
        md: "100%",
      },
    },
    screens: {
      sm: "576px",

      smx: { max: "576px" },
      // => @media (min-width: 576px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      mdx: { max: "768px" },

      mlg: "911px",
      // => @media (min-width: 911px) { ... }

      mlgx: { max: "910px" },
      // => @media (max-width: 910px) { ... }

      lg: "992px",
      // => @media (min-width: 992px) { ... }

      xl: "1200px",
      // => @media (min-width: 1200px) { ... }

      "2xl": "1400px",
      // => @media (min-width: 1400px) { ... }
    },
  },
  plugins: [],
};
