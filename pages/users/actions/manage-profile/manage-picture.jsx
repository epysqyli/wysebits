import axios from "axios";
import { useState, useEffect } from "react";
import { Sliders } from "react-feather";
import Image from "next/dist/client/image";

const ManagePicture = ({ userState, userLoading }) => {
  const [avatarUrl, setAvatarUrl] = useState(null);

  const updateImage = async () => {
    return await axios({
      method: "post",
      url: `http://localhost:3001/api/users/${userState.user.id}/update_avatar`,
      withCredentials: true,
    });
  };

  useEffect(() => setAvatarUrl(userState.user.avatar));

  return (
    <div>
      <div className="bg-gray-700 flex items-center justify-between px-10 text-white py-14">
        <Sliders size={36} strokeWidth={1.5} />
        <div className="text-2xl">Manage your profile picture</div>
      </div>

      <div className="w-4/5 mx-auto my-20">
        <div className="flex items-center justify-around">
          <div>
            {userLoading === true ? null : (
              <Image
                src={userState.user.avatar}
                width={125}
                height={125}
                className="rounded-md"
              />
            )}
          </div>
        </div>

        <div className="text-center my-20">
          <label
            htmlFor="new-image"
            className="cursor-pointer border p-4 rounded-md shadow hover:shadow-md transition-shadow text-gray-800"
          >
            Upload a new avatar for your profile
          </label>
          <input type="file" name="" id="new-image" className="hidden" />
        </div>
      </div>
    </div>
  );
};

export default ManagePicture;
