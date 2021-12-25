import { ArrowUpRight } from "react-feather";
import Link from "next/link";
import slugify from "slugify";

const SuggestBox = ({ suggestions, suggestLink }) => {
  const slug = (title, id) =>
    slugify(`${title}-${id}`, { lower: true, strict: true });

  if (suggestions != null) {
    if (suggestLink == "/books/") {
      return (
        <div>
          {suggestions.map((s) => {
            return (
              <Link
                key={s._source.id}
                href={`${suggestLink}${slug(s._source.title, s._source.id)}/1`}
              >
                <div className="flex items-center justify-between px-2 bg-white my-1 shadow rounded-md text-gray-700">
                  <div className="my-2">{s._source.title}</div>
                  <ArrowUpRight size={18} color="gray" />
                </div>
              </Link>
            );
          })}
        </div>
      );
    } else if (suggestLink == "/users/book-tiles/create/") {
      return (
        <div>
          {suggestions.map((s) => {
            return (
              <Link key={s._source.id} href={`${suggestLink}${s._source.id}`}>
                <div className="flex items-center justify-between px-2 bg-white my-1 shadow rounded-md text-gray-700">
                  <div className="my-2">{s._source.title}</div>
                  <ArrowUpRight size={18} color="gray" />
                </div>
              </Link>
            );
          })}
        </div>
      );
    }
  } else {
    return null;
  }
};

export default SuggestBox;
