import Image from "next/dist/client/image";

const AuthorResult = ({author}) => {
  return <div>{author.full_name}</div>;
};

export default AuthorResult;
