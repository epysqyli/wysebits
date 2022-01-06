import {
  getLoggedUser,
  getFavCategories,
  getCategories,
} from "../../../../lib/serverSideMethods";

import { useState } from "react";

export const getServerSideProps = async (context) => {
  const user = await getLoggedUser(context);
  const favCategories = await getFavCategories(user, context);

  const categories = await getCategories();

  return {
    props: {
      cats: categories.data,
      favCats: favCategories.data,
    },
  };
};

const ManageCategories = ({ cats, favCats }) => {
  const [categories, setCategories] = useState(cats);
  const [favCategories, setFavCategories] = useState(favCats);

  const isFav = (cat) => favCategories.some((userCat) => userCat.id === cat.id);

  const baseClass = "border rounded py-1 text-center bg-gray-200";
  const favClass = "border rounded py-1 text-center bg-white";
  
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

      <div className="mx-auto w-4/5 py-10">
        <div className="text-center text-lg mb-10">Choose up to three categories</div>
        <div className="grid grid-cols-2 gap-px">
          {categories.map((cat) => {
            return (
              <div key={cat.id} className={isFav(cat) ? favClass : baseClass}>
                {cat.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ManageCategories;
