interface IElasticTileEntry {
  id: number;
  content: string;
  upvotes: number;
  downvotes: number;
  netvotes: number;
  created_at: string;
  updated_at: string;
}

export default IElasticTileEntry;
