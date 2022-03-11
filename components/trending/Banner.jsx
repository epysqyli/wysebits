import { Book, AlignJustify, User } from "react-feather";

const Banner = ({ text, iconProp }) => {
  let icon;
  switch (iconProp) {
    case "book":
      icon = <Book size={32} strokeWidth={1.75} />;
      break;
    case "user":
      icon = <User size={32} strokeWidth={1.75} />;
      break;
    case "insight":
      icon = <AlignJustify size={32} strokeWidth={1.75} />;
      break;
  }

  return (
    <div className="flex justify-around items-center w-3/5 mx-auto border-b-2 py-2 px-5 text-white">
      {icon}
      <span className="block bg-gray text-3xl">{text}</span>
    </div>
  );
};

export default Banner;
