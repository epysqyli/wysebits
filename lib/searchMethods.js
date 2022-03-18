// calls related to books or authors search

import axios from "axios";

const searchBooks = async (keywords, pageNum) => {
  return await axios({
    method: "post",
    data: { keywords: JSON.stringify(keywords) },
    url: `${process.env.BASE_URL}/search/books?page=${pageNum}`,
  });
};

const searchAuthors = async (keywords, pageNum) => {
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

export { searchAuthors, searchBooks, searchWithinCategory };
