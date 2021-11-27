import { useState } from "react";
import { useRouter } from "next/router";

const SignUp = () => {
  const [userData, setUserData] = useState({
    username: null,
    emailAddress: null,
    password: null,
    passwordConfirmation: null,
  });

  const router = useRouter();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const makePostCall = async (e) => {
    e.preventDefault();

    let resp = await fetch("http://localhost:3001/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: userData.username,
          email_address: userData.emailAddress,
          password: userData.password,
          password_confirmation: userData.passwordConfirmation,
        },
      }),
    });

    resp = await resp.json();

    if (resp.status === "success") {
      router.push("/users/actions");
    }
  };

  return (
    <div>
      <div className="h-60 bg-signup-top bg-cover bg-center relative">
        <div className="bg-gray-900 h-full bg-opacity-80">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white w-screen text-center text-3xl leading-10">
            Start learning.
            <br /> Start sharing.
          </div>
        </div>
      </div>

      <form className="mx-auto w-full py-10" onSubmit={makePostCall}>
        <div className="w-4/6 mx-auto my-4">
          <label htmlFor="username" className="pl-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="block mt-2 w-full border-none focus:ring-0 rounded-lg shadow-sm focus:shadow-md"
            onChange={handleChange}
            required
          />
        </div>

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

        <div className="w-4/6 mx-auto my-4">
          <label htmlFor="name" className="pl-1">
            Password Confirmation
          </label>
          <input
            type="password"
            name="passwordConfirmation"
            id="password_confirmation"
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

export default SignUp;
