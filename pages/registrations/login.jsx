import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const LogIn = () => {
  const [userData, setUserData] = useState({
    emailAddress: null,
    password: null,
  });
  const router = useRouter();
  const logInUrl = "http://localhost:3001/api/login";

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const logIn = async (e) => {
    e.preventDefault();
    const { emailAddress, password} = userData;

    axios
      .post(
        logInUrl,
        { email_address: emailAddress, password: password },
        { withCredentials: true }
      )
      .then((resp) => console.log(resp))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className="h-60 bg-login-top bg-cover bg-center relative">
        <div className="bg-gray-900 h-full bg-opacity-80">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 text-white w-screen text-center text-2xl">
            Keep the knowledge journey going
          </div>
        </div>
      </div>

      <form className="mx-auto w-full py-10" onSubmit={logIn}>
        <div className="w-4/6 mx-auto my-4">
          <label htmlFor="email" className="pl-1">
            Email
          </label>
          <input
            type="email"
            name="emailAddress"
            id="email"
            className="block mt-2 w-full border-none focus:ring-0 rounded-lg shadow-sm focus:shadow-md"
            onChange={handleChange}
            required
          />
        </div>

        <div className="w-4/6 mx-auto my-4">
          <label htmlFor="name" className="pl-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="block mt-2 w-full border-none focus:ring-0 rounded-lg shadow-sm focus:shadow-md"
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="block mx-auto w-2/6 border rounded-lg px-5 py-2 bg-white my-10 hover:shadow-md focus:bg-gray-200 focus:shadow-md"
        >
          Let's go!
        </button>
      </form>
    </div>
  );
};

export default LogIn;
