import axios from "axios";
import { useState, useEffect } from "react";
import {
  CheckCircle,
  Sliders,
  Image as ImageLoader,
  XCircle,
  Upload,
} from "react-feather";

import { createAvatar, deleteAvatar } from "../../../../lib/avatarMethods";
import Image from "next/dist/client/image";

const ManageAvatar = ({ userState, userLoading }) => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [file, setFile] = useState(null);

  const isBtnActive = () => {
    if (avatarUrl !== userState.user.avatar) return true;
    return false;
  };

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
    setIsUploaded(false);
  };

  const createImage = async (userId, formData) => {
    return await createAvatar(userId, formData);
  };

  const deleteImage = async (userId) => {
    const resp = await deleteAvatar(userId);
    setAvatarUrl(resp.data.avatar_url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (file) formData.append("user[avatar]", file);

    const resp = await createImage(userState.user.id, formData);
    setIsUploaded(true);
  };

  const submitButton =
    isBtnActive() === true ? (
      <button
        className="block mt-20 mx-auto px-4 py-2 rounded-md bg-gray-500 text-white hover:shadow-md active:bg-gray-700"
        type="submit"
      >
        Change picture!
      </button>
    ) : (
      <button
        className="block mt-20 mx-auto px-4 py-2 rounded-md text-gray-300 border cursor-default"
        type="submit"
        disabled
      >
        Change picture!
      </button>
    );

  const submittedConfirmation = (
    <div className="mt-20 w-min mx-auto border rounded-md px-20 py-2 animate-show-up-slow">
      <CheckCircle size={36} strokeWidth={1.5} />
    </div>
  );

  useEffect(() => setAvatarUrl(userState.user.avatar || null), [userLoading]);

  useEffect(() => {
    if (file === null) return;

    const fileUrl = URL.createObjectURL(file);
    setAvatarUrl(fileUrl);

    return () => URL.revokeObjectURL(fileUrl);
  }, [file]);

  return (
    <div>
      <div className="bg-gray-700 flex items-center justify-center gap-x-5 md:gap-x-10 text-white py-14">
        <Sliders size={36} strokeWidth={1.5} />
        <div className="text-2xl">Your avatar</div>
      </div>

      <div className="w-4/5 mx-auto my-10">
        <div className="text-center mb-20 text-2xl border-b pb-2 text-gray-700">
          Current profile picture
        </div>

        <div className="flex items-center justify-around relative">
          <div>
            {avatarUrl === null || userLoading === true ? (
              <ImageLoader size={60} strokeWidth={1.5} color="gray" />
            ) : (
              <Image
                src={avatarUrl}
                width={125}
                height={125}
                className="rounded-md"
              />
            )}
          </div>
        </div>

        <form className="my-20" onSubmit={handleSubmit}>
          <div className="flex items-center justify-around md:w-3/5 lg:w-2/5 mx-auto">
            <div
              className="cursor-pointer border px-5 py-2 rounded-md shadow hover:shadow-md transition-shadow text-gray-800"
              onClick={() => deleteImage(userState.user.id)}
            >
              <XCircle className="w-min mx-auto mb-3" />
              <div>Delete current</div>
            </div>
            <label
              htmlFor="new-image"
              className="cursor-pointer border px-5 py-2 rounded-md shadow hover:shadow-md transition-shadow text-gray-800"
            >
              <Upload className="w-min mx-auto mb-3" />
              <div>Upload avatar</div>
            </label>
            <input
              type="file"
              name="avatar"
              id="new-image"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>

          {isUploaded === true ? submittedConfirmation : submitButton}
        </form>
      </div>
    </div>
  );
};

export default ManageAvatar;
