import { useState, useEffect } from "react";
import { Sliders } from "react-feather";

const ManagePicture = () => {
  return (
    <div>
      <div className="bg-gray-700 flex items-center justify-between px-10 text-white py-14">
        <Sliders size={36} strokeWidth={1.5} />
        <div className="text-2xl">Manage your profile picture</div>
      </div>
    </div>
  );
};

export default ManagePicture;
