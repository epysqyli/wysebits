import IAuthor from "./IAuthor";
import IElasticTileEntry from "./IElasticTileEntry";

interface IElasticBook {
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
}

export default IElasticBook;
