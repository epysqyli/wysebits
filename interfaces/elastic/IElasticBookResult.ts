import IElasticBook from "./IElasticBook";
import IElasticBase from "./IElasticBase";

interface IElasticBookResult extends IElasticBase {
  _source: IElasticBook;
  highlight: {
    title: Array<string>;
  };
}

export default IElasticBookResult;
