interface IElasticBookQuery {
  title?: string;
  "category.id"?: number;
  "category.slug.keyword"?: string;
  "authors.id"?: number;
  "authors.full_name"?: string;
}

export default IElasticBookQuery;
