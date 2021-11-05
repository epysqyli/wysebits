module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        "bottom-home": "url('/images/ai-banner.jpg')",
        library: "url('/images/library.jpg')",
        "signup-top": "url('/images/signup-top.jpg')",
        "login-top": "url('/images/progress.jpg')",
        "create-book-tile": "url('/images/create-book-tile.jpg')",
      },
      animation: {
        "show-up": "appear 300ms ease-out 1",
        "show-up-slow": "appear 600ms ease-out 1",
      },
      keyframes: {
        appear: {
          "0%": { opacity: 0.1 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
