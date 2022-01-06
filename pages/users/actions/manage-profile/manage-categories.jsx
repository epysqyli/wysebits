import {
  getLoggedUser,
  getFavCategories,
  getCategories,
} from "../../../../lib/serverSideMethods";

import axios from "axios";
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

const ManageCategories = ({ cats, favCats, userState }) => {
  const [categories, setCategories] = useState(cats);
  const [favCategories, setFavCategories] = useState(favCats);

  const isFav = (cat) => favCategories.some((userCat) => userCat.id === cat.id);
  const isAddable = () => (favCategories.length == 3 ? false : true);

  const addToFav = async (cat) => {
    await axios({
      method: "post",
      url: `http://localhost:3001/api/users/${userState.user.id}/categories/${cat.id}/add_to_fav`,
      withCredentials: true,
    });
    addToState(cat);
  };

  const removeFromFav = async (cat) => {
    await axios({
      method: "post",
      url: `http://localhost:3001/api/users/${userState.user.id}/categories/${cat.id}/remove_from_fav`,
      withCredentials: true,
    });
    removeFromState(cat);
  };

  const addToState = (cat) => {
    const newFavs = [...favCategories, cat];
    setFavCategories(newFavs);
  };

  const removeFromState = (cat) => {
    const newFavs = favCategories.filter((item) => item.id !== cat.id);
    setFavCategories(newFavs);
  };

  const baseClass =
    "rounded py-1 text-center text-gray-500 hover:text-gray-900 bg-gray-100 shadow cursor-pointer transition-all";
  const favClass =
    "rounded py-1 text-center bg-white shadow-inner cursor-pointer transition-all";
  const noSelection = baseClass + " cursor-default";

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
        <div className="text-center text-lg mb-10">
          Choose up to three categories
        </div>
        <div className="grid grid-cols-2 gap-y-2 gap-x-2">
          {categories.map((cat) => {
            return (
              <div
                key={cat.id}
                className={
                  isFav(cat) ? favClass : !isAddable() ? noSelection : baseClass
                }
                onClick={() => {
                  isFav(cat)
                    ? removeFromFav(cat)
                    : isAddable() && addToFav(cat);
                }}
              >
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
