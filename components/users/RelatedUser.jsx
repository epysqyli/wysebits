import { User, BookOpen, AlignCenter } from "react-feather";
import Link from "next/dist/client/link";
import { countTotalInsights } from "../../lib/creatorMethods";

const RelatedUser = ({ relatedUser }) => {
  return (
    <Link href={`/creators/${relatedUser.username}`}>
      <div className="flex justify-center items-center gap-x-10">
        <div>
          <User
            size={60}
            strokeWidth={1.5}
            color="gray"
            className="bg-gray-300 rounded-full p-2"
          />
        </div>
        <div>
          <div className="mb-5 text-2xl font-bold text-gray-700">
            {relatedUser.username}
          </div>
          <div className="flex text-gray-700 gap-x-10">
            <div className="flex gap-x-3 items-center">
              <BookOpen color="gray" />
              <div className="text-sm">
                {relatedUser.book_tiles.length} books
              </div>
            </div>
            <div className="flex gap-x-3 items-center">
              <AlignCenter color="gray" />
              <div className="text-sm">
                {countTotalInsights(relatedUser.book_tiles)} insights
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RelatedUser;
