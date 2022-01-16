import { ArrowUpRight } from "react-feather";
import Link from "next/link";
import slugify from "slugify";

const SuggestBox = ({ suggestions, suggestLink, searchMode }) => {
  const slug = (title, id) =>
    slugify(`${title}-${id}`, { lower: true, strict: true });

  const buildLink = (result) => {
    if (suggestLink === "/books/")
      return `${suggestLink}${slug(result._source.title, result._source.id)}/1`;

    if (suggestLink === "/authors/")
      return `${suggestLink}${slug(
        result._source.full_name,
        result._source.id
      )}/1`;

    if (suggestLink == "/users/book-tiles/create/")
      return `${suggestLink}${result._source.id}`;
  };

  if (searchMode === "books" && suggestions) {
    return (
      <div>
        {suggestions.map((s) => {
          return (
            <Link key={s._source.id} href={buildLink(s)}>
              <div className="flex items-center justify-between px-2 md:px-10 bg-white my-1 shadow rounded-md text-gray-800 cursor-pointer group hover:scale-105 transition-transform active:bg-gray-100">
                <div className="my-3 w-4/5">
                  <div>{s._source.title}</div>
                  <div className="flex gap-x-2 text-sm text-gray-600">
                    <div>
                      {s._source.authors[0]
                        ? s._source.authors[0].full_name
                        : "No authors"}
                    </div>
                    <div>|</div>
                    <div>{s._source.category.name}</div>
                  </div>
                </div>
                <ArrowUpRight
                  size={18}
                  color="gray"
                  className="group-hover:scale-125 transition-transform"
                />
              </div>
            </Link>
          );
        })}
      </div>
    );
  }

  if (searchMode === "authors" && suggestions) {
    return (
      <div>
        {suggestions.map((s) => {
          return (
            <Link key={s._source.id} href={buildLink(s)}>
              <div className="flex items-center justify-between px-2 md:px-10 bg-white my-1 shadow rounded-md text-gray-800 cursor-pointer group hover:scale-105 transition-transform active:bg-gray-100">
                <div className="my-3 w-4/5">
                  <div>{s._source.full_name}</div>
                </div>
                <ArrowUpRight
                  size={18}
                  color="gray"
                  className="group-hover:scale-125 transition-transform"
                />
              </div>
            </Link>
          );
        })}
      </div>
    );
  }

  return null;
};

export default SuggestBox;
