import axios from "axios";
import { Terminal } from "react-feather";

const ForgotPassword = () => {
  const sendEmail = async () => {
    const resp = await axios({
      method: "post",
      url: "http://localhost:3001/api/password/forgot",
      data: { email_address: emailAddress },
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center w-3/5 mx-auto pt-10 pb-5 border-b-2">
        <Terminal size={36} />
        <div className="text-3xl text-gray-800">reset password</div>
      </div>

      <form className="mx-auto md:w-4/6 lg:w-3/6 py-10">
        <div className="w-4/6 mx-auto my-4">
          <label htmlFor="email" className="pl-1 text-xl text-gray-800">
            Email address
          </label>
          <input
            type="email"
            name="emailAddress"
            id="email"
            className="block mt-4 w-full border-none focus:ring-blue-400 ring-0 focus:ring-2 rounded-lg shadow-sm focus:shadow-md"
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
