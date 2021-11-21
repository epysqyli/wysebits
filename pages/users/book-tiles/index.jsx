import axios from "axios";
import BookCardTiles from "../../../components/BookCardTiles";
import WelcomeTop from "../../../components/users/WelcomeTop";
import { useEffect } from "react";

export const getServerSideProps = async (context) => {
  const resp = await axios({
    method: "get",
    url: "http://localhost:3001/api/logged_in",
    headers: { cookie: context.req.headers.cookie },
  });

  const bookTiles = await axios({
    method: "get",
    url: `http://localhost:3001/api/users/${resp.data.user.id}/book_tiles`,
  });

  return {
    props: {
      bookTiles: bookTiles.data.tiles,
      allData: bookTiles.data,
    },
  };
};

const UserBookTiles = ({ bookTiles, allData }) => {
  useEffect(() => {
    console.log(allData);
  }, [])

  return (
    <div>
      <WelcomeTop firstLine="Here are the books for which" secondLine="you have shared your insights" />
      <div className="w-4/5 mx-auto my-16">
        {bookTiles.map((bookTile) => {
          return (
            <div className="my-10" key={bookTile.book.id}>
              <BookCardTiles
                bookData={bookTile.book}
                tileEntries={bookTile.tile_entries}
                bookTileId={bookTile.id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserBookTiles;
