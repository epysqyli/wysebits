module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        "bottom-home": "url('/images/ai-banner.jpg')",
        "library": "url('/images/library.jpg')",
        "signup-top": "url('/images/signup-top.jpg')",
        "login-top": "url('/images/progress.jpg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
