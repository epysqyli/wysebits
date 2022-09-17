import axios, { AxiosResponse } from "axios";
import IElasticBookResult from "../../interfaces/elastic/IElasticBookResult";
import IElasticQuery from "../../interfaces/elastic/IElasticQuery";

const searchBooks = async (searchQuery: IElasticQuery): Promise<AxiosResponse<Array<IElasticBookResult>>> => {
  return await axios({
    method: "POST",
    url: `${process.env.BASE_URL}/elastic_search/books`,
    data: { search_query: searchQuery }
  });
};

export { searchBooks };
