interface IElasticQuery {
  match?: {
    must?: Array<any>;
    filter?: Array<any>;
  };
  term?: {
    filter: Array<any>;
  };
}

export default IElasticQuery;
