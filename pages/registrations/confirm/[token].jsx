import axios from "axios";
import { CheckCircle, Compass } from "react-feather";
import { useState } from "react";
import Link from "next/dist/client/link";
import IconAndTitle from "../../../components/layout/IconAndTitle";

export const getServerSideProps = (context) => {
  const token = context.query.token;

  return { props: { token } };
};

const ConfirmToken = ({ token }) => {
  const [confirmed, setConfirmed] = useState(false);

  const sendConfirmation = async () => {
    try {
      const resp = await axios({
        method: "POST",
        url: `${process.env.BASE_URL}/confirm`,
        data: { token: token },
      });

      setConfirmed(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pt-10 lg:pt-16">
      <IconAndTitle title="Confirm account - Wysebits"/>
      <div className="mx-auto w-11/12 md:w-4/6 lg:w-1/2 xl:w-2/5">
        <div className="pt-16">
          <Compass
            size={50}
            strokeWidth={1.5}
            className="text-gray-50 mx-auto"
          />
          <div className="text-center text-lg text-gray-50 mt-12">
            Confirm your account in order to be able to login and make full use
            of Wysebits!
          </div>
        </div>

        {confirmed === false ? (
          <div
            className="text-center text-3xl font-light py-20 mx-auto mt-28 border-b-2 border-blue-500 rounded-md bg-white shadow-md cursor-pointer hover:bg-gray-50 active:bg-gray-200 transition-colors"
            onClick={sendConfirmation}
          >
            Activate your account
          </div>
        ) : (
          <div className="text-center font-light mx-auto mt-28 rounded-md bg-gradient-to-br from-white to-green-100 py-1 shadow-lg">
            <CheckCircle
              size={36}
              strokeWidth={1.75}
              className="w-min mx-auto my-10"
            />
            <div className="text-2xl">Your account is now active!</div>
            <Link href="/registrations/login">
              <div className="my-10 py-3 text-3xl cursor-pointer w-3/5 mx-auto shadow-md bg-white rounded-md hover:bg-gray-100 active:shadow-inner">
                Go to login
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmToken;
