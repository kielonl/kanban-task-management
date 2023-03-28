/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-purple": "#635FC7",
        "main-purple-hover": "#A8A4FF",
        "main-purple-light": "#635fc740",
        black: "#000112",
        "very-dark-grey": "#20212C",
        "dark-grey": "#2B2C37",
        "dark-lines": "#3E3F4E",
        "light-lines": "#E4EBFA",
        grey: "#828FA3",
        "light-grey": "#F4F7FD",
        "thin-grey": "#828ba340",
        white: "#FFFFFF",
        red: "#EA5555",
        "red-hover": "#FF9898",
        "black-opacity": "#00000080",
      },
      keyframes: {
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
          to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        },
      },
      animation: {
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
