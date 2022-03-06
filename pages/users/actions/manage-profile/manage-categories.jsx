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
      url: `${process.env.BASE_URL}/users/${userState.user.id}/fav_categories`,
      data: { id: cat.id },
      withCredentials: true,
    });
    addToState(cat);
  };

  const removeFromFav = async (cat) => {
    await axios({
      method: "delete",
      url: `${process.env.BASE_URL}/users/${userState.user.id}/fav_categories/${cat.id}`,
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
    "rounded py-2 text-center text-gray-400 hover:text-gray-900 bg-gray-100 cursor-pointer border-2 transition-all select-none";
  const favClass =
    "rounded py-2 text-center bg-white shadow-inner cursor-pointer transition-all border-2 border-blue-400";
  const noSelection = baseClass + " cursor-default";

  return (
    <>
      <div className="bg-categories bg-cover bg-center shadow">
        <div className="bg-gray-800 bg-opacity-70 text-white text-2xl font-medium text-center py-12">
          <div>Update your favorite categories</div>
          <div className="text-sm mt-5 font-normal w-4/5 mx-auto">
            This will influence the suggestions that you get on the category
            section of the feed
          </div>
        </div>
      </div>

      <div className="mx-auto w-11/12 md:w-4/6 py-10 animate-show-up-slow">
        <div className="text-center text-2xl text-gray-700 mb-10 border-b pb-2">
          Choose up to three categories
        </div>
        <div className="grid grid-cols-2 gap-y-2 gap-x-2 lg:grid-cols-3 lg:gap-y-3 lg:gap-x-3 xl:grid-cols-4">
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
    </>
  );
};

export default ManageCategories;
