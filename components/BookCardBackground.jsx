import BookCard from "./BookCard";

const BookCardBackground = ({bookData, showEditForm, bcgImage}) => {
  <div className="relative mt-10 py-4">
    <img
      src={bcgImage()}
      className="absolute top-0 left-1/2 -translate-x-1/2 blur-sm backdrop-brightness-50 grayscale-50 contrast-50 max-h-full w-full object-cover"
    />

    <div className="w-4/5 mx-auto shadow-md backdrop-blur-md backdrop-brightness-75 text-white my-10 rounded-md relative z-10">
      <div className="mb-2">
        <BookCard bookData={bookData} />
      </div>

      <div
        className="border-t border-gray-500 text-center text-sm py-2 cursor-pointer hover:contrast-75 transition-all rounded-br-md rounded-bl-md"
        onClick={() => showEditForm()}
      >
        Wrong or missing author, title, category, or cover?
      </div>
    </div>
  </div>;
};

export default BookCardBackground;
