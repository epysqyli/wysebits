const countTotalInsights = (tiles) => {
  let count = 0;
  tiles.forEach((tile) => (count += tile.tile_entries.length));
  return count;
};

export { countTotalInsights };
