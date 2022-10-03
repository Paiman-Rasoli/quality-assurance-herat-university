const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        vazirBold: ["vazir bold"],
      },
      screens: {
        xs: "320px",
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [],
};
