import axios from "axios";

const countTotalInsights = (tiles) => {
  let count = 0;
  tiles.forEach((tile) => (count += tile.tile_entries.length));
  return count;
};

const getBookUserInsights = async (userId, bookId) => {
  return await axios({
    method: "GET",
    url: `${process.env.BASE_URL}/users/${userId}/books/${bookId}/book_index` 
  })
}

export { countTotalInsights, getBookUserInsights };
