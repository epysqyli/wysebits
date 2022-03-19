import Image from "next/dist/client/image";
import { useState } from "react";
import { Image as ImageLoader } from "react-feather";
import Link from "next/dist/client/link";
import { slug } from "../../lib/utils";

const AuthorResult = ({ author }) => {
  const [imageIsLoaded, setImageIsLoaded] = useState(false);

  const photoUrl = (key) =>
    `https://covers.openlibrary.org/a/olid/${key}-M.jpg`;

  return (
    <Link
      href={{
        pathname: "/authors/[slug]",
        query: {
          slug: `${slug(author.full_name, author.id)}`,
          page: 1,
        },
      }}
    >
      <div className="flex justify-between items-center bg-gray-50 px-2 py-2 rounded-md cursor-pointer border-2 border-gray-200 hover:border-gray-400 active:bg-gray-100 active:shadow-inner">
        <div className="w-1/4 relative">
          {imageIsLoaded == false ? (
            <ImageLoader
              size={40}
              strokeWidth={1.5}
              color="gray"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"
            />
          ) : null}
          <div className="bg-gray-200 animate-show-up-slow rounded-md">
            <Image
              src={photoUrl(author.key)}
              className="animate-show-up-slow rounded-md"
              layout="responsive"
              width="40"
              height="60"
              objectFit="cover"
              onLoad={() => setImageIsLoaded(true)}
            />
          </div>
        </div>
        <div className="w-2/4 text-xl">{author.full_name}</div>
      </div>
    </Link>
  );
};

export default AuthorResult;
