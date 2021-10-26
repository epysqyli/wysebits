const SignUp = () => {
  return (
    <div>
      <div className="h-60 bg-signup-top bg-cover bg-center relative">
        <div className="bg-gray-900 h-full bg-opacity-80">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 text-white w-screen text-center text-2xl">
            Start learning. Start sharing.
          </div>
        </div>
      </div>

      <form
        action="http://localhost:3001/api/signup"
        method="post"
        className="mx-auto w-full py-10"
      >
        <div className="w-4/6 mx-auto my-4">
          <label htmlFor="username" className="pl-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="block mt-2 w-full border-none focus:ring-0 rounded-lg shadow-sm focus:shadow-md"
          />
        </div>

        <div className="w-4/6 mx-auto my-4">
          <label htmlFor="email" className="pl-1">
            Email
          </label>
          <input
            type="email"
            name="email_address"
            id="email"
            className="block mt-2 w-full border-none focus:ring-0 rounded-lg shadow-sm focus:shadow-md"
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
          />
        </div>

        <div className="w-4/6 mx-auto my-4">
          <label htmlFor="name" className="pl-1">
            Password Confirmation
          </label>
          <input
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            className="block mt-2 w-full border-none focus:ring-0 rounded-lg shadow-sm focus:shadow-md"
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
