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
        "check-book-tiles": "url('/images/create-book-tile.jpg')",
        "liked-books": "url('/images/liked-books.jpg')",
        "saved-tiles": "url('/images/saved-tiles.jpg')",
        settings: "url('/images/settings.jpg')",
        "create-tile": "url('/images/create-tile.jpg')",
        discovery: "url('/images/discovery.jpg')",
        following: "url('/images/following.jpg')",
        followers: "url('/images/followers.jpg')",
        categories: "url('/images/categories.jpg')",
        "user-welcome": "url('/images/user-welcome.jpg')",
        "wip-contributions": "url('/images/wip-contributions.jpg')",
        feed: "url('/images/feed-alt.jpg')",
        author: "url('/images/author.jpg')",
        stats: "url('/images/stats.png')",
        conversations: "url('/images/conversations.png')",
        history: "url('/images/categories/history.jpg')",
        philosophy: "url('/images/categories/philosophy.jpg')",
        "religion-and-spirituality":
          "url('/images/categories/spirituality.jpg')",
        science: "url('/images/categories/science.jpg')",
        essay: "url('/images/categories/essay.jpg')",
        "self-help": "url('/images/categories/self-help.jpg')",
        "health-and-wellness":
          "url('/images/categories/health-and-wellness.jpg')",
        "crafts-and-hobbies":
          "url('/images/categories/crafts-and-hobbies.jpg')",
        "language-books": "url('/images/categories/language-books.jpg')",
        "arts-books": "url('/images/categories/arts-books.jpg')",
        "memoirs-and-biographies":
          "url('/images/categories/memoirs-and-biographies.jpg')",
        journalism: "url('/images/categories/journalism.jpg')",
        business: "url('/images/categories/business.jpg')",
        politics: "url('/images/categories/politics.jpg')",
        "social-sciences": "url('/images/categories/social-sciences.jpg')",
        "academic-texts": "url('/images/categories/academic-texts.jpg')",
        "guides-and-how-to-manuals":
          "url('/images/categories/guides-and-how-to-manuals.jpg')",
        "economics-and-finance":
          "url('/images/categories/economics-and-finance.jpg')",
        various: "url('/images/categories/various.jpg')",
        technology: "url('/images/categories/technology.jpg')",
        comments: "url('/images/comments.jpg')",
      },
      grayscale: {
        50: "50%",
      },
      animation: {
        "show-up": "appear 300ms ease-out 1",
        "show-up-slow": "appear 600ms ease-out 1",
        "show-up-slow-opaque": "appearOpaque 600ms ease-out 1",
        "confirm-update": "greenConfirm 300ms ease-out 1",
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
        greenConfirm: {
          "0%": { backgroundColor: "#E1F7E9", opacity: 0.25 },
          "50%": { backgroundColor: "#E1F7E9", opacity: 0.75 },
          "100%": { backgroundColor: "#E1F7E9", opacity: 0.25 },
        },
      },
      minHeight: {
        "24rem": "24rem",
      },
      maxHeight: {
        "24rem": "24rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
