import Head from "next/head";
import { User } from "react-feather";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Wysebits</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="md:container mx-auto">
        <div className="text-white text-center bg-gray-300 py-3 shadow-sm">
          header
        </div>
        <div className="group flex justify-around items-center w-4/6 mx-auto py-2 mt-4 bg-white rounded-lg shadow-md hover:shadow-lg">
          <User size={30} className="group-hover:text-black text-gray-600" />
          <div className="group-hover:text-black text-gray-600">User</div>
        </div>
      </div>
    </div>
  );
}
