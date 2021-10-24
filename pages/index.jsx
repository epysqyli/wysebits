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
        <div className="flex justify-around w-3/6 mx-auto border">
          <User />
          <div>User</div>
        </div>
      </div>
    </div>
  );
}
