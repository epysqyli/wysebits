import axios, { AxiosResponse } from "axios";
import IElasticBookResult from "../../interfaces/IElasticBookResult";

const searchBooks = async (title: string): Promise<AxiosResponse<Array<IElasticBookResult>>> => {
  return await axios({
    method: "GET",
    url: `${process.env.BASE_URL}/elastic_search/books/${title}`
  });
};

export { searchBooks };
