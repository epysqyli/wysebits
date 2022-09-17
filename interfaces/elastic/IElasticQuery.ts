interface IElasticQuery {
  match?: {
    must?: any;
    filter?: any;
  };
  term?: {
    filter: any;
  };
}

export default IElasticQuery;
