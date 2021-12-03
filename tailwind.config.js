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
        "check-book-tiles": "url('/images/create-book-tile.jpg')",
        "liked-books": "url('/images/liked-books.jpg')",
        "saved-tiles": "url('/images/saved-tiles.jpg')",
        "settings": "url('/images/settings.jpg')",
        "create-tile": "url('/images/create-tile.jpg')",
        "discovery": "url('/images/discovery.jpg')",
        "following": "url('/images/following.jpg')",
        "followers": "url('/images/followers.jpg')",
        "categories": "url('/images/categories.jpg')",
      },
      grayscale: {
        50: "50%",
      },
      animation: {
        "show-up": "appear 300ms ease-out 1",
        "show-up-slow": "appear 600ms ease-out 1",
        "show-up-slow-opaque": "appearOpaque 600ms ease-out 1",
      },
      keyframes: {
        appear: {
          "0%": { opacity: 0.1 },
          "100%": { opacity: 1 },
        },
        appearOpaque: {
          "0%": { opacity: 0.1 },
          "100%": { opacity: 0.5 },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
