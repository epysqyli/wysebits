import BookCard from "../books/BookCard";
import Banner from "./Banner";

const TrendingBook = ({ book }) => {
  return (
    <div>
      <Banner text='Book' iconProp='book' />
      <div className='rounded-md bg-white shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all active:shadow-inner border-b-2 mt-5 border-blue-200 hover:border-blue-300 py-2'>
        <BookCard bookData={book} showAuthorLink={true} showCategoryLink={true} showBookLink={true} />
      </div>
    </div>
  );
};

export default TrendingBook;
