module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["covers.openlibrary.org", process.env.IMAGE_DOMAIN],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};
