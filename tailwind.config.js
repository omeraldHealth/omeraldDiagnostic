/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/*.{js,ts,jsx,tsx}",
    "./components/**/*",
  ],
  theme: {
    colors: {
      primary: "#45A19E",
      secondary: "#4438ca",
      btnPrimary: {
        100: "#D0D8D9",
        200: "#A2B1B3",
        300: "#738B8E",
        400: "#456468",
        500: "#173e43",
        600: "#5D5FEF"
      },
      btnSecondary: "#4438ca",
      orangeBg:"#FFA500",
      darkBlue:"#0F0E2C",
      ...colors,
    },
    animation: {
      none: "none",
      spin: "spin 1s linear infinite",
      ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
      pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      bounce: "bounce 1s infinite",
    },
    // fontFamily: {},
    extend: {
      backgroundImage: theme => ({
        'signBanner': `${""}`,
        'my-background': "url('@styles/themes/background.jpg')",
      }),
      lineHeight: {
        'copyRight': '26',
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
