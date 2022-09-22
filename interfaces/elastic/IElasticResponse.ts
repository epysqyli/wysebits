import IElasticBookResult from "./IElasticBookResult";

interface IElasticResponse {
  total: number;
  per_page: number;
  results: Array<IElasticBookResult>;
}

export default IElasticResponse;
