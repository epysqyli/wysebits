import axios from "axios";
import { CheckCircle, Compass } from "react-feather";

export const getServerSideProps = (context) => {
  const token = context.query.token;

  return { props: { token } };
};

const ConfirmToken = ({ token }) => {
  const sendConfirmation = async () => {
    const resp = await axios({
      method: "POST",
      url: "http://localhost:3001/api/confirm",
      data: { token: token },
    });

    console.log(resp);
  };

  return (
    <div className="pb-52 md:pb-60 lg:pb-72 2xl:pb-80 bg-gradient-to-br from-blue-50 via-gray-100 to-gray-200">
      <div className="mx-auto w-11/12 md:w-4/6 lg:w-1/2 xl:w-2/5">
        <div className="flex justify-between items-center py-24 gap-x-10 border-b-2">
          <Compass
            size={50}
            strokeWidth={1.5}
            className="w-1/4 text-gray-600"
          />
          <div className="text-lg">
            Confirm your account in order to be able to login and make full use
            of Wysebits!
          </div>
        </div>

        <div
          onClick={sendConfirmation}
          className="w-4/5 mx-auto mt-40 text-center text-2xl py-20 border-b-2 border-blue-500 rounded-md bg-white shadow-md cursor-pointer hover:bg-gray-50 active:bg-gray-200 transition-colors"
        >
          Confirm now
        </div>
      </div>
    </div>
  );
};

export default ConfirmToken;
