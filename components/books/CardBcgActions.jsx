import BookCard from "./BookCard";
import Image from "next/dist/client/image";

const CardBcgActions = ({ bookData, showEditForm, bcgImage }) => {
  return (
    <div className="relative py-6 lg:w-4/5 2xl:w-2/3 lg:mt-5 lg:rounded-md mx-auto">
      <Image
        src={bcgImage()}
        className="absolute blur backdrop-brightness-50 grayscale-25 contrast-50 lg:rounded-md"
        layout="fill"
        objectFit="cover"
      />

      <div className="w-11/12 md:w-4/6 lg:w-4/6 xl:w-3/5 2xl:w-1/2 mx-auto shadow-md backdrop-blur-md backdrop-brightness-75 text-white rounded-md relative z-10">
        <div className="mb-2">
          <BookCard
            bookData={bookData}
            showAuthorLink={true}
            showCategoryLink={true}
          />
        </div>

        <div
          className="border-t border-gray-500 text-center text-sm py-2 cursor-pointer hover:contrast-75 transition-all rounded-br-md rounded-bl-md"
          onClick={() => showEditForm()}
        >
          Wrong or missing author, title, category, or cover?
        </div>
      </div>
    </div>
  );
};

export default CardBcgActions;
