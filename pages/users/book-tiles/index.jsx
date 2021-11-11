import axios from "axios";
import BookCardTiles from "../../../components/BookCardTiles";

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
      bookTiles: bookTiles.data,
    },
  };
};

const UserBookTiles = ({ bookTiles, userState }) => {
  return (
    <div>
      <div className="w-4/5 mx-auto my-20">
        <div className="text-2xl text-center border-b-2 pb-2 shadow-md">
          Here are your book tiles
        </div>
        {bookTiles.map((bookTile) => {
          return (
            <div className="my-10">
              <BookCardTiles
                bookData={bookTile.book}
                tileEntries={bookTile.tile_entries}
                bookTileId={bookTile.id}
                key={bookTile.book.id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserBookTiles;
