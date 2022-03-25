// calls related to books or authors search

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
    url: `${process.env.BASE_URL}/search/authors?page=${pageNum}`,
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

const searchWithinCreatorBooks = async (userId, keywords, pageNum = 1) => {
  return await axios({
    method: "post",
    data: { keywords: JSON.stringify(keywords) },
    url: `${process.env.BASE_URL}/search/${userId}/creator_books?page=${pageNum}`,
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
  searchWithinCategory,
  searchWithinFavBooks,
  searchWithinCreatorBooks,
  searchWithinAuthor,
};
