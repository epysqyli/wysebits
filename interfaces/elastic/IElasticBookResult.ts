import IBook from "./IElasticBook";
import IElasticBase from "./IElasticBase";

interface IElasticBookResult extends IElasticBase {
  _source: IBook;
  highlight: {
    title: Array<string>;
  };
}

export default IElasticBookResult;
