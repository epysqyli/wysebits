import IElasticBook from "./IElasticBook";
import IElasticRespBase from "./IElasticRespBase";

interface IElasticBookResult extends IElasticRespBase {
  _source: IElasticBook;
  highlight: {
    title: Array<string>;
  };
}

export default IElasticBookResult;
