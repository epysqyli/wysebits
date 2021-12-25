import { ArrowUpRight } from "react-feather";

const SuggestBox = ({ suggestions }) => {
  if (suggestions != null) {
    return (
      <div>
        {suggestions.results.map((s) => {
          return <div key={s._id}>{s._source.title}</div>;
        })}
      </div>
    );
  } else {
    return null;
  }
};

export default SuggestBox;
