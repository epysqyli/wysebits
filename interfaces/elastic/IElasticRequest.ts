// use generics to type this interface?
interface IElasticQuery {
  match?: {
    must?: Array<any>;
    filter?: Array<any>;
  };
  term?: {
    filter: Array<any>;
  };
}

interface IElasticSort {
  [fieldName: string]: {
    order: "desc" | "asc";
  };
}


interface IElasticRequest {
  query: IElasticQuery;
  sort: Array<IElasticSort> | undefined;
}

export default IElasticRequest;
