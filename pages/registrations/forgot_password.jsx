import axios from "axios";
import { Terminal } from "react-feather";
import { useState } from "react";

const ForgotPassword = () => {
  const [emailAddress, setEmailAddress] = useState("");

  const handleChange = (e) => {
    const newEmailAddress = e.target.value;
    setEmailAddress(newEmailAddress);
  };

  const sendEmail = async () => {
    return await axios({
      method: "post",
      url: "http://localhost:3001/api/password/forgot",
      data: { email_address: emailAddress },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resp = await sendEmail();
    console.log(resp);
  };

  return (
    <div className="py-10">
      <div className="flex justify-around items-center w-5/6 md:w-4/6 lg:w-3/6 mx-auto my-5 pb-5 border-b-2 md:border-none">
        <Terminal size={36} />
        <div className="text-3xl text-gray-800">Reset password</div>
      </div>

      <form
        className="mx-auto md:w-4/6 lg:w-3/6 xl:w-2/5 py-10 md:border md:shadow rounded"
        onSubmit={handleSubmit}
      >
        <div className="w-4/6 mx-auto mt-5 mb-20">
          <label htmlFor="email" className="pl-1 text-xl text-gray-800">
            Email address
          </label>
          <input
            type="email"
            name="emailAddress"
            id="email"
            className="block mt-4 w-full border-none focus:ring-blue-400 ring-0 focus:ring-2 rounded-lg shadow-sm focus:shadow-md"
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="block mx-auto w-4/6 bg-white my-10 rounded-lg px-5 py-2 text-gray-800 shadow-md hover:shadow-lg transition-shadow active:shadow-inner"
        >
          Send me the instructions to reset my password
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
