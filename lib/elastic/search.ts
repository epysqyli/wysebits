import axios, { AxiosResponse } from "axios";
import IElasticBookResult from "../../interfaces/elastic/IElasticBookResult";
import IElasticQuery from "../../interfaces/elastic/IElasticQuery";

const searchBooks = async (
  searchQuery: IElasticQuery,
  page: string
): Promise<AxiosResponse<Array<IElasticBookResult>>> => {
  return await axios({
    method: "POST",
    url: `${process.env.BASE_URL}/elastic_search/books?page=${page}`,
    data: { search_query: searchQuery }
  });
};

export { searchBooks };
