// calls related to books or authors search

import axios from "axios";

const searchBooks = async (keywords, pageNum) => {
  return await axios({
    method: "post",
    data: { keywords: JSON.stringify(keywords) },
    url: `http://localhost:3001/api/search/books?page=${pageNum}`,
  });
};

const searchAuthors = async (keywords, pageNum) => {
  return await axios({
    method: "post",
    data: { keywords: JSON.stringify(keywords) },
    url: `http://localhost:3001/api/search/authors?page=${pageNum}`,
  });
};

export { searchAuthors, searchBooks };
