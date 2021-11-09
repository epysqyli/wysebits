import axios from "axios";
import BookCard from "../../../components/BookCard";

export const getServerSideProps = async (context) => {
  const resp = await axios({
    method: "get",
    url: "http://localhost:3001/api/logged_in",
    headers: { cookie: context.req.headers.cookie },
  });

  const userId = resp.data.user.id;

  const bookTiles = await axios({
    method: "get",
    url: `http://localhost:3001/api/users/${userId}/book_tiles`,
  });

  return {
    props: {
      bookTiles: bookTiles.data,
    },
  };
};

const UserBookTiles = ({ bookTiles }) => {
  return (
    <div>
      <div className="w-4/5 mx-auto my-20">
        {bookTiles.map((bookTile) => {
          return (
            <div className="my-10">
              <BookCard
                bookData={bookTile.book}
                tileEntries={bookTile.tile_entries}
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
