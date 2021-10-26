const SignUp = () => {
  return (
    <div>
      <div className="h-60 mx-auto bg-signup-top bg-cover bg-center my-10">
        <div className="bg-gray-900 h-full bg-opacity-80 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <p className="text-white text-gray-200 w-screen text-center text-2xl">
              Start learning. Start sharing.
            </p>
          </div>
        </div>
      </div>

      <form
        action="http://localhost:3001/api/signup"
        method="post"
        className="mx-auto w-full"
      >
        <div className="w-4/6 mx-auto my-4">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            className="block mt-2 w-full border-none focus:ring-0 rounded-lg shadow-sm focus:shadow-md"
          />
        </div>

        <div className="w-4/6 mx-auto my-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email_address"
            id="email"
            className="block mt-2 w-full border-none focus:ring-0 rounded-lg shadow-sm focus:shadow-md"
          />
        </div>

        <div className="w-4/6 mx-auto my-4">
          <label htmlFor="name">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="block mt-2 w-full border-none focus:ring-0 rounded-lg shadow-sm focus:shadow-md"
          />
        </div>

        <div className="w-4/6 mx-auto my-4">
          <label htmlFor="name">Password Confirmation</label>
          <input
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            className="block mt-2 w-full border-none focus:ring-0 rounded-lg shadow-sm focus:shadow-md"
          />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
