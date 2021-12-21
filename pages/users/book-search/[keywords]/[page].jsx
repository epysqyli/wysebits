import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { PlusCircle } from "react-feather";
import BookSearchTile from "../../../../components/books/BookSearchTile";
import NoAccess from "../../../../components/users/NoAccess";
import NavButtonElastic from "../../../../components/navigation/NavButtonElastic";
import SearchInput from "../../../../components/navigation/SearchInput";

export const getServerSideProps = async (context) => {
  try {
    const keywords = context.query.keywords;
    const splitKeywords = context.query.keywords.split("-").join(" ");
    const pageNum = context.query.page;

    const searchResults = await axios({
      method: "post",
      data: { keywords: JSON.stringify(splitKeywords), page_num: pageNum },
      url: "http://localhost:3001/api/search/books",
      headers: { cookie: context.req.headers.cookie },
    });

    return {
      props: {
        searchResults: searchResults.data.results,
        pageNum: searchResults.data.page_num,
        keywords: keywords,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

const BookSearchResults = ({ searchResults, userState, keywords, pageNum }) => {
  const [btnVisible, setBtnVisible] = useState(false);

  const clientUrl = `/users/book-search/${keywords}`;

  const showBtn = () => {
    setBtnVisible(true);
  };

  const createBookBtn = (
    <Link href="/users/book-tiles/create/create-book">
      <div className="cursor-pointer py-4 text-center transition border-t-4 border-gray-50 bg-gray-100 hover:bg-gray-300 active:bg-gray-400 fixed bottom-0 left-0 w-screen animate-show-up z-10">
        <div className="flex justify-center items-center gap-x-4">
          <div className="text-sm font-medium">
            No results? Add your book now!
          </div>
          <PlusCircle strokeWidth={1.5} color="gray" />
        </div>
      </div>
    </Link>
  );

  useEffect(() => {
    setTimeout(showBtn, 2000);
  }, []);

  if (userState.isLogged) {
    return (
      <div>
        <div className="my-10 w-4/5 mx-auto md:w-4/6 lg:w-3/6 xl:w-2/6">
          <SearchInput
            pageDest="/users/book-search/"
            placeholder="Search for any book"
          />
        </div>
        <div className="w-11/12 grid gap-y-12 md:grid-cols-2 md:gap-x-6 mx-auto">
          {searchResults.length != 0
            ? searchResults.map((book) => {
                return (
                  <BookSearchTile
                    bookData={book}
                    destPage={`/users/book-tiles/create/${book._source.id}`}
                    key={book._id}
                  />
                );
              })
            : null}

          {btnVisible ? createBookBtn : null}
        </div>

        <div className="flex items-center my-16 w-4/5 mx-auto gap-x-4">
          <div className="w-1/2">
            <NavButtonElastic
              btnText="Previous page"
              clientUrl={clientUrl}
              pageNum={pageNum - 1}
            />
          </div>
          <div className="w-1/2">
            <NavButtonElastic
              btnText="Next page"
              clientUrl={clientUrl}
              pageNum={pageNum + 1}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <NoAccess />;
  }
};

export default BookSearchResults;
