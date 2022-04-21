import axios from "axios";
import { useState } from "react";
import { CheckCircle, User } from "react-feather";
import { useEffect } from "react";

const UpdateUsername = () => {
  const [username, setUsername] = useState("");
  const [available, setAvailable] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const isUsernameAvailable = async () => {
    return await axios({
      method: "post",
      url: `${process.env.BASE_URL}/users/username_available`,
      data: { username: username },
    });
  };

  const changeUsername = async () => {
    return await axios({
      method: "put",
      url: `${process.env.BASE_URL}/users/update_username`,
      data: { user: { username: username } },
      withCredentials: true,
    });
  };

  const handleChange = async (e) => setUsername(e.target.value.trim());

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await changeUsername();
      if (resp.status === 200) setConfirmed(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    if (username.length > 3) {
      const resp = await isUsernameAvailable();
      setAvailable(resp.data);
    } else {
      setAvailable(false);
    }
  }, [username]);

  if (confirmed === false)
    return (
      <div className="pt-10 lg:pt-16">
        <div className="py-10">
          <div className="flex justify-between items-center w-5/6 md:w-4/6 lg:w-3/6 mx-auto mt-5 pb-5 border-b-2 md:border-none">
            <User size={36} className="text-gray-50" />
            <div className="text-3xl text-gray-50 text-right">
              Choose a new username
            </div>
          </div>

          <form
            className="mx-auto w-5/6 md:w-4/6 lg:w-3/6 py-10 md:border md:shadow rounded"
            onSubmit={handleSubmit}
          >
            <div className="mx-auto my-10">
              <label htmlFor="username" className="pl-1 text-xl text-gray-50">
                Choose a new username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                minLength={4}
                className={`block mt-4 w-full border-none focus:ring-blue-400 ring-0 focus:ring-2 rounded-lg shadow-sm focus:shadow-md ${
                  available
                    ? "bg-green-100"
                    : username !== "" && username.length > 3
                    ? "bg-red-100"
                    : null
                }`}
                onChange={handleChange}
                required
              />
            </div>
            {available === true ? (
              <button
                type="submit"
                className="block mx-auto bg-white my-10 rounded-lg px-5 py-3 text-gray-50 shadow-md hover:shadow-lg transition-shadow active:shadow-inner"
              >
                Confirm username change
              </button>
            ) : (
              <button
                type="submit"
                className="block mx-auto bg-gray-50 my-10 rounded-lg px-5 py-3 text-gray-400"
                disabled
              >
                Confirm username change
              </button>
            )}
          </form>
        </div>
      </div>
    );

  return (
    <div className="py-10">
      <div className="flex justify-between items-center w-5/6 md:w-4/6 lg:w-3/6 mx-auto mt-5 pb-5 border-b-2">
        <User size={36} className="text-gray-700" />
        <div className="text-3xl text-gray-800">Choose a new username</div>
      </div>

      <div className="text-center font-light w-4/5 md:w-4/6 lg:w-1/2 xl:w-1/3 mx-auto mt-20 rounded-md bg-gradient-to-br from-white to-green-100 py-10 shadow-lg animate-show-up-slow">
        <CheckCircle
          size={36}
          strokeWidth={1.75}
          className="w-min mx-auto my-10"
        />
        <div className="text-2xl">Your username has been changed!</div>
      </div>
    </div>
  );
};

export default UpdateUsername;
