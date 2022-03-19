import { capitalize } from "../../lib/utils";

const HeaderImage = ({ name, slug }) => {
  let style = "";

  switch (slug) {
    case "history":
      style =
        "bg-history bg-cover bg-center shadow lg:w-4/5 2xl:w-2/3 lg:mt-5 lg:rounded-md mx-auto";
      break;
    case "philosophy":
      style =
        "bg-philosophy bg-cover bg-center shadow lg:w-4/5 2xl:w-2/3 lg:mt-5 lg:rounded-md mx-auto";
      break;
    case "religion-and-spirituality":
      style =
        "bg-religion-and-spirituality bg-cover bg-center shadow lg:w-4/5 2xl:w-2/3 lg:mt-5 lg:rounded-md mx-auto";
      break;
    case "science":
      style =
        "bg-science bg-cover bg-center shadow lg:w-4/5 2xl:w-2/3 lg:mt-5 lg:rounded-md mx-auto";
      break;
    case "essay":
      style =
        "bg-essay bg-cover bg-center shadow lg:w-4/5 2xl:w-2/3 lg:mt-5 lg:rounded-md mx-auto";
      break;
    case "self-help":
      style =
        "bg-self-help bg-cover bg-center shadow lg:w-4/5 2xl:w-2/3 lg:mt-5 lg:rounded-md mx-auto";
      break;
    case "health-and-wellness":
      style =
        "bg-health-and-wellness bg-cover bg-center shadow lg:w-4/5 2xl:w-2/3 lg:mt-5 lg:rounded-md mx-auto";
      break;
    case "crafts-and-hobbies":
      style =
        "bg-crafts-and-hobbies bg-cover bg-center shadow lg:w-4/5 2xl:w-2/3 lg:mt-5 lg:rounded-md mx-auto";
      break;
    case "language-books":
      style =
        "bg-language-books bg-cover bg-center shadow lg:w-4/5 2xl:w-2/3 lg:mt-5 lg:rounded-md mx-auto";
      break;
    case "arts-books":
      style =
        "bg-arts-books bg-cover bg-center shadow lg:w-4/5 2xl:w-2/3 lg:mt-5 lg:rounded-md mx-auto";
      break;
    case "journalism":
      style =
        "bg-journalism bg-cover bg-center shadow lg:w-4/5 2xl:w-2/3 lg:mt-5 lg:rounded-md mx-auto";
      break;
    case "business":
      style =
        "bg-business bg-cover bg-center shadow lg:w-4/5 2xl:w-2/3 lg:mt-5 lg:rounded-md mx-auto";
      break;
    case "politics":
      style =
        "bg-politics bg-cover bg-center shadow lg:w-4/5 2xl:w-2/3 lg:mt-5 lg:rounded-md mx-auto";
      break;
    case "social-sciences":
      style =
        "bg-social-sciences bg-cover bg-center shadow lg:w-4/5 2xl:w-2/3 lg:mt-5 lg:rounded-md mx-auto";
      break;
    case "academic-texts":
      style =
        "bg-academic-texts bg-cover bg-center shadow lg:w-4/5 2xl:w-2/3 lg:mt-5 lg:rounded-md mx-auto";
      break;
    case "guides-and-how-to-manuals":
      style =
        "bg-guides-and-how-to-manuals bg-cover bg-center shadow lg:w-4/5 2xl:w-2/3 lg:mt-5 lg:rounded-md mx-auto";
      break;
    case "economics-and-finance":
      style =
        "bg-economics-and-finance bg-cover bg-center shadow lg:w-4/5 2xl:w-2/3 lg:mt-5 lg:rounded-md mx-auto";
      break;
    case "various":
      style =
        "bg-various bg-cover bg-center shadow lg:w-4/5 2xl:w-2/3 lg:mt-5 lg:rounded-md mx-auto";
      break;
    case "technology":
      style =
        "bg-technology bg-cover bg-center shadow lg:w-4/5 2xl:w-2/3 lg:mt-5 lg:rounded-md mx-auto";
      break;
    case "memoirs-and-biographies":
      style =
        "bg-memoirs-and-biographies bg-cover bg-center shadow lg:w-4/5 2xl:w-2/3 lg:mt-5 lg:rounded-md mx-auto";
      break;
    default:
      style =
        "bg-categories bg-cover bg-center shadow lg:w-4/5 2xl:w-2/3 lg:mt-5 lg:rounded-md mx-auto";
  }

  return (
    <div className={style}>
      <div className="bg-gray-800 bg-opacity-70 text-white text-4xl lg:text-5xl font-bold text-center py-16 lg:rounded-md">
        {capitalize(name)}
      </div>
    </div>
  );
};

export default HeaderImage;
