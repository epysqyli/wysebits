import { Mail } from "react-feather";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const SignUp = () => {
  const [emailSent, setEmailSent] = useState(false);

  const [userData, setUserData] = useState({
    username: null,
    emailAddress: null,
    password: null,
    passwordConfirmation: null,
  });

  const [file, setFile] = useState(null);

  const router = useRouter();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const createFormData = () => {
    const formData = new FormData();

    formData.append("user[username]", userData.username);
    formData.append("user[email_address]", userData.emailAddress);
    formData.append("user[password]", userData.password);
    formData.append(
      "user[password_confirmation]",
      userData.passwordConfirmation
    );
    if (file) formData.append("user[avatar]", file);

    return formData;
  };

  const signUp = async (e) => {
    e.preventDefault();
    const formData = createFormData();

    const resp = await axios({
      method: "POST",
      url: "http://localhost:3001/api/signup",
      data: formData,
    });

    console.log(resp);
    if (resp.status === 200) setEmailSent(true);
  };

  if (emailSent === false)
    return (
      <div>
        <div className="h-60 bg-signup-top bg-cover bg-center relative">
          <div className="bg-gray-900 h-full bg-opacity-80">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white  text-center text-3xl leading-10">
              Start learning.
              <br /> Start sharing.
            </div>
          </div>
        </div>

        <form className="mx-auto md:w-4/6 lg:w-3/6 py-10" onSubmit={signUp}>
          <div className="w-4/6 mx-auto my-4">
            <label htmlFor="username" className="pl-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="block mt-2 w-full border-none focus:ring-0 rounded-lg shadow focus:shadow-md"
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
              className="block mt-2 w-full border-none focus:ring-0 rounded-lg shadow focus:shadow-md"
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
              className="block mt-2 w-full border-none focus:ring-0 rounded-lg shadow focus:shadow-md"
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
              className="block mt-2 w-full border-none focus:ring-0 rounded-lg shadow focus:shadow-md"
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-4/6 mx-auto my-4">
            <label htmlFor="user-avatar">Upload an avatar picture</label>
            <input
              type="file"
              name="user-avatar"
              id="user-avatar"
              onChange={(e) => setFile(e.target.files[0])}
              className="bg-white py-2 w-full px-3 mt-5 rounded-md shadow-sm"
            />
          </div>

          <button
            type="submit"
            className="block mx-auto w-1/2 border rounded-lg px-5 py-2 bg-white my-10 hover:shadow-md focus:bg-gray-200 focus:shadow-md"
          >
            Let's go!
          </button>
        </form>
      </div>
    );

  return (
    <div>
      <div className="h-60 bg-signup-top bg-cover bg-center relative">
        <div className="bg-gray-900 h-full bg-opacity-80">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white  text-center text-3xl leading-10">
            Start learning.
            <br /> Start sharing.
          </div>
        </div>
      </div>

      <div className="mt-20 w-5/6 md:w-1/2 lg:w-1/3 xl:w-1/4 p-10 mx-auto rounded-md shadow-md bg-white animate-show-up-slow">
        <Mail
          className="w-min mx-auto mb-10 text-gray-700"
          size={60}
          strokeWidth={1.5}
        />
        <div className="text-center md:text-left text-lg">
          We have sent you an email to{" "}
          <span className="font-medium tracking-tighter">
            {userData.emailAddress}
          </span>{" "}
          with a link to confirm your account on Wysebits!
        </div>
      </div>
    </div>
  );
};

export default SignUp;
