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
            <p className="text-white text-center text-gray-500 text-2xl my-5">
              Knowledge. Distilled.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
