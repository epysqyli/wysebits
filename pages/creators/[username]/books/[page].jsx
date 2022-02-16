import { getUser, getBookTiles } from "../../../../lib/serverSideMethods";
import Link from "next/dist/client/link";
import BookCard from "../../../../components/books/BookCard";
import { slug } from "../../../../lib/utils";
import Pagination from "../../../../components/navigation/Pagination";
import { Meh } from "react-feather";

export const getServerSideProps = async (context) => {
  const username = context.params.username;
  const pageNum = context.params.page;

  const user = await getUser(username);
  const bookTiles = await getBookTiles(user, pageNum);
  const pagy = bookTiles.data.pagy;
  const books = bookTiles.data.tiles.map((tile) => tile.book);

  return {
    props: { books, pagy, username },
  };
};

const UserBooks = ({ books, pagy, username }) => {
  const clientUrl = `/creators/${username}/books`;

  if (books.length !== 0)
    return (
      <div>
        <div className="bg-check-book-tiles bg-cover bg-center shadow">
          <div className="bg-gray-800 bg-opacity-70 text-white text-2xl md:text-3xl font-bold text-center py-12">
            <div className="mx-auto w-4/5">
              All books contributed to by {username}
            </div>
          </div>
        </div>

        <div>
          <div className="py-10 w-11/12 lg:w-4/5 xl:w-11/12 grid gap-y-12 md:grid-cols-2 md:gap-x-6 xl:grid-cols-3 xl:gap-x-10 2xl:grid-cols-4 mx-auto">
            {books.map((book) => {
              return (
                <Link
                  href={`/books/${slug(book.title, book.id)}/1`}
                  key={book.id}
                >
                  <div className="rounded-md bg-white shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all cursor-pointer active:shadow-inner border-b-2 border-blue-200 hover:border-blue-300">
                    <BookCard bookData={book} />
                  </div>
                </Link>
              );
            })}
          </div>

          <Pagination clientUrl={clientUrl} pagy={pagy} />
        </div>
      </div>
    );

  if (books.length === 0)
    return (
      <div>
        <div className="bg-check-book-tiles bg-cover bg-center shadow">
          <div className="bg-gray-800 bg-opacity-70 text-white text-2xl md:text-3xl font-bold text-center py-12">
            <div className="mx-auto w-4/5">
              All books contributed to by {username}
            </div>
          </div>
        </div>

        <div className="mx-auto w-4/5 text-center mt-20 text-xl">
          <div className="mx-auto w-min mb-20 animate-bounce">
            <Meh
              size={48}
              color="gray"
              strokeWidth={1.75}
              className="animate-spin"
            />
          </div>
          <div className="md:w-3/5 mx-auto lg:w-2/5">
            {username} is yet to publish contributions to the books he or she
            has read
          </div>
        </div>
      </div>
    );
};

export default UserBooks;
