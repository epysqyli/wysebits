import IElasticBookResult from "./IElasticBookResult";

interface IElasticResponse {
  total: number;
  results: Array<IElasticBookResult>;
}

export default IElasticResponse;
