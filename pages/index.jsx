import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Wysebits</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-6xl font-bold mt-5 text-center">Wysebits.</h1>
      <p className="text-center text-gray-500 text-2xl mt-5">
        Knowledge. Distilled.
      </p>
    </div>
  );
}
