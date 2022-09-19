import axios, { AxiosResponse } from "axios";
import IElasticBookResult from "../../interfaces/elastic/IElasticBookResult";
import IElasticRequest from "../../interfaces/elastic/IElasticRequest";

const searchBooks = async (
  searchRequest: IElasticRequest,
  page: string
): Promise<AxiosResponse<Array<IElasticBookResult>>> => {
  return await axios({
    method: "POST",
    url: `${process.env.BASE_URL}/elastic_search/books?page=${page}`,
    data: { search_request: searchRequest }
  });
};

export { searchBooks };
