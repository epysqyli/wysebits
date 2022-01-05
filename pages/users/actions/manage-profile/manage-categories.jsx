import {
  getLoggedUser,
  getFavCategories,
  getCategories,
} from "../../../../lib/serverSideMethods";

export const getServerSideProps = async (context) => {
  const user = await getLoggedUser(context);
  const favCategories = await getFavCategories(user, context);

  const categories = await getCategories();

  return {
    props: {
      categories: categories.data,
      favCategories: favCategories.data,
    },
  };
};

const ManageCategories = ({categories, favCategories}) => {
  return <div></div>;
};

export default ManageCategories;
