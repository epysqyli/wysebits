import axios from "axios";
import { useEffect, useState } from "react";
import { CheckCircle, Mail } from "react-feather";
import { isEmailAvailable } from "../../../../lib/manageProfileMethods";

const UpdateEmail = () => {
  const [email, setEmail] = useState("");
  const [available, setAvailable] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const changeEmail = async () => {
    return await axios({
      method: "post",
      url: `${process.env.BASE_URL}/users/update_email`,
      data: { user: { email_address: email } },
      withCredentials: true,
    });
  };

  const handleChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await changeEmail();
      if (resp.status === 200) setConfirmed(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    if (email.length > 5) {
      const resp = await isEmailAvailable(email);
      setAvailable(resp.data);
    } else {
      setAvailable(false);
    }
  }, [email]);

  if (confirmed === false)
    return (
      <>
        <div className="py-10">
          <div className="flex justify-between items-center w-11/12 md:w-4/6 lg:w-3/6 mx-auto mt-5 pb-5 border-b-2 md:border-none">
            <Mail size={36} className="text-gray-50" />
            <div className="text-3xl text-gray-50">Update email address</div>
          </div>

          <form
            className="mx-auto md:w-4/6 lg:w-3/6 xl:w-2/5 py-10 md:border md:shadow rounded"
            onSubmit={handleSubmit}
          >
            <div className="w-4/6 mx-auto my-10">
              <label htmlFor="email" className="pl-1 text-xl text-gray-50">
                New email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                minLength={8}
                className={`block mt-4 w-full border-none focus:ring-blue-400 ring-0 focus:ring-2 rounded-lg shadow-sm focus:shadow-md ${
                  available
                    ? "bg-green-100"
                    : email !== "" && email.length > 5
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
                className="block mx-auto w-4/6 bg-white my-10 rounded-lg px-5 py-3 text-gray-50 shadow-md hover:shadow-lg transition-shadow active:shadow-inner"
              >
                Confirm email address change{" "}
              </button>
            ) : (
              <button
                type="submit"
                className="block mx-auto w-4/6 bg-gray-50 my-10 rounded-lg px-5 py-3 text-gray-400"
                disabled
              >
                Confirm email address change
              </button>
            )}
          </form>
        </div>
      </>
    );

  return (
    <div className="py-10">
      <div className="flex justify-between items-center w-5/6 md:w-4/6 lg:w-3/6 mx-auto mt-5 pb-5 border-b-2">
        <Mail size={36} className="text-gray-700" />
        <div className="text-3xl text-gray-800 text-right">Update email address</div>
      </div>

      <div className="text-center font-light w-4/5 md:w-4/6 lg:w-1/2 xl:w-1/3 mx-auto mt-20 rounded-md bg-gradient-to-br from-white to-blue-100 py-10 shadow-lg animate-show-up-slow">
        <CheckCircle
          size={36}
          strokeWidth={1.75}
          className="w-min mx-auto my-10"
        />
        <div className="text-2xl w-4/5 mx-auto">
          Check your new email address for a confirmation link!
        </div>
      </div>
    </div>
  );
};

export default UpdateEmail;
