import axios from "axios";

const searchBooks = async (keywords, pageNum = 1) => {
  return await axios({
    method: "post",
    data: { keywords: JSON.stringify(keywords) },
    url: `${process.env.BASE_URL}/search/books?page=${pageNum}`,
  });
};

const searchAuthors = async (keywords, pageNum = 1) => {
  return await axios({
    method: "post",
    data: { keywords: JSON.stringify(keywords) },
    url: `${process.env.BASE_URL}/search/books_from_authors?page=${pageNum}`,
  });
};

const searchAuthorsBooks = async (
  book_keywords,
  author_keywords,
  pageNum = 1
) => {
  return await axios({
    method: "post",
    data: { book_keywords: book_keywords, author_keywords: author_keywords },
    url: `${process.env.BASE_URL}/search/books_authors?page=${pageNum}`,
  });
};

const searchWithinCategory = async (categorySlug, keywords, pageNum = 1) => {
  return await axios({
    method: "post",
    data: { keywords: JSON.stringify(keywords) },
    url: `${process.env.BASE_URL}/search/${categorySlug}?page=${pageNum}`,
  });
};

const searchWithinFavBooks = async (userId, keywords, pageNum = 1) => {
  return await axios({
    method: "post",
    data: { keywords: JSON.stringify(keywords) },
    url: `${process.env.BASE_URL}/search/${userId}/fav_books?page=${pageNum}`,
  });
};

const searchWithinBookTiles = async (userId, keywords, pageNum = 1) => {
  return await axios({
    method: "post",
    data: { keywords: JSON.stringify(keywords) },
    url: `${process.env.BASE_URL}/search/${userId}/book_tiles?page=${pageNum}`,
  });
};

const searchWithinAuthor = async (authorId, keywords, pageNum = 1) => {
  return await axios({
    method: "post",
    data: { keywords: JSON.stringify(keywords) },
    url: `${process.env.BASE_URL}/search/${authorId}/books?page=${pageNum}`,
  });
};

export {
  searchAuthors,
  searchBooks,
  searchAuthorsBooks,
  searchWithinCategory,
  searchWithinFavBooks,
  searchWithinBookTiles,
  searchWithinAuthor,
};
