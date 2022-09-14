import IAuthor from "./IAuthor";
import IElasticTileEntry from "./IElasticTileEntry";

interface IElasticBookResult {
  _index: string;
  _type: string;
  _id: string;
  _source: {
    title: string;
    ol_key: string;
    cover_url?: string;
    tiles_count: number;
    elastic_tile_entries: Array<IElasticTileEntry>;
    category: {
      id: number;
      slug: string;
    };
    authors: Array<IAuthor>;
  };
  highlight: {
    title: Array<string>;
  };
}

export default IElasticBookResult;
