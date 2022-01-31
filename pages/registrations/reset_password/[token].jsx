import axios from "axios";
import { Key } from "react-feather";
import { useState } from "react";

export const getServerSideProps = (context) => {
  return { props: { token: context.query.token } };
};

const ResetPassword = ({ token }) => {
  return (
    <div className="py-10">
      <div className="flex justify-between items-center w-5/6 md:w-4/6 lg:w-3/6 mx-auto mt-5 pb-5 border-b-2">
        <Key size={36} />
        <div className="text-3xl text-gray-800">Choose a new password</div>
      </div>

      <form className="mx-auto md:w-4/6 lg:w-3/6 xl:w-2/5 py-10 md:border md:shadow rounded">
        <div className="w-4/6 mx-auto my-10">
          <label htmlFor="password" className="pl-1 text-xl text-gray-800">
            New password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="block mt-4 w-full border-none focus:ring-blue-400 ring-0 focus:ring-2 rounded-lg shadow-sm focus:shadow-md"
            required
          />
        </div>

        <div className="w-4/6 mx-auto my-10">
          <label
            htmlFor="password-confirmation"
            className="pl-1 text-xl text-gray-800"
          >
            Password confirmation
          </label>
          <input
            type="password"
            name="password-confirmation"
            id="password-confirmation"
            className="block mt-4 w-full border-none focus:ring-blue-400 ring-0 focus:ring-2 rounded-lg shadow-sm focus:shadow-md"
            required
          />
        </div>

        <button
          type="submit"
          className="block mx-auto w-4/6 bg-white my-10 rounded-lg px-5 py-3 text-gray-800 shadow-md hover:shadow-lg transition-shadow active:shadow-inner"
        >
          Confirm password change
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
