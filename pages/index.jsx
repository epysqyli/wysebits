import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Wysebits</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-screen h-60 mx-auto bg-home-banner bg-cover bg-center">
        <div className="bg-gray-900 h-full bg-opacity-40 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-white text-6xl font-bold text-center">
              Wysebits.
            </h1>
            <p className="text-white text-center text-gray-200 text-2xl my-5">
              Knowledge. Distilled.
            </p>
          </div>
        </div>
      </div>

      <div className="w-screen mt-10">
        <form action="">
          <input
            type="text"
            name=""
            id=""
            placeholder="Search for any book"
            className="block mx-auto w-3/6 transition-all duration-200 ease-out hover:w-5/6 focus:w-5/6 rounded-lg focus:ring-0 outline-none focus:border-current border-none shadow-sm hover:shadow-md text-center"
          />
        </form>
      </div>
    </div>
  );
}
