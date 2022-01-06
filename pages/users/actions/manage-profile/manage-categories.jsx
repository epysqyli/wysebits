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

const ManageCategories = ({ categories, favCategories }) => {
  return (
    <div>
      <div className="bg-categories bg-cover bg-center shadow">
        <div className="bg-gray-800 bg-opacity-70 text-white text-2xl font-medium text-center py-12">
          <div>Update your favorite categories</div>
          <div className="text-sm mt-5 font-normal">
            This will influence the suggestions that you get on the feed
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCategories;
