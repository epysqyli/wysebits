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
        <div className="text-white text-center bg-gray-400 p-5">
          something is here
        </div>
        <div className="flex justify-around items-center w-4/6 mx-auto py-2 mt-4 border rounded-lg">
          <User size={30}/>
          <div>User</div>
        </div>
      </div>
    </div>
  );
}
