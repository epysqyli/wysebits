import axios from "axios";

// functions to create/edit book data

const searchAuthors = async (author_full_name) => {
  return await axios({
    method: "post",
    data: { keywords: JSON.stringify(author_full_name), page_num: "1" },
    url: `${process.env.BASE_URL}/search/authors`,
  });
};

const createAuthor = async (author_full_name) => {
  return await axios({
    method: "post",
    url: `${process.env.BASE_URL}/authors/`,
    data: { full_name: author_full_name },
    withCredentials: true,
  });
};

export { createAuthor, searchAuthors };
