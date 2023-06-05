module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    maxWidth: {
      "3xs": "16.5rem", //264px
      xs: "21.5rem", //344px
      md: "30rem", //480px
    },
    colors: {
      "main-purple": "#635FC7",
      "main-purple-light": "#A8A4FF",
      "purple-secondary":"#635FC71A",
      "purple-secondary-hover":"#635FC740",
      black: "#000112",
      "very-dark-grey": "#20212C",
      "dark-grey": "#2B2C37",
      "medium-grey": "#828FA3",
      "light-grey": "#F4F7FD",
      "lines-dark": "#3E3F4E",
      "lines-light": "#E4EBFA",
      red: "#EA5555",
      "red-light": "#FF9898",
      white: "#FFF",
    },
    fontSize: {
      xs: ".75rem", //12px
      sm: ".8rem", //13px
      base: ".94rem", //15px
      lg: "1.125rem", //18px
      xl: "1.25rem", //20px
      "2xl": "1.5rem", //24px
      "3xl": "1.875rem", //30px
    },
    extend: {
      boxShadow: {
        task: "0 4px 6px 0px rgba(54, 78, 126, 0.1)",
        selectShadow: "0px 10px 20px #364E7E40",
      },
      spacing: {
        4.5: "1.125rem", //18px
      },
    },
  },
  plugins: [],
};
