import axios, { AxiosResponse } from "axios";
import IElasticRequest from "../../interfaces/elastic/IElasticRequest";
import IElasticResponse from "../../interfaces/elastic/IElasticResponse";

const searchBooks = async (
  searchRequest: IElasticRequest,
  page: string
): Promise<AxiosResponse<IElasticResponse>> => {
  return await axios({
    method: "POST",
    url: `${process.env.BASE_URL}/elastic_search/books?page=${page}`,
    data: { search_request: searchRequest }
  });
};

export { searchBooks };
