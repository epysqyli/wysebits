import Head from "next/head";

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
        <p>This is some text</p>
      </div>
    </div>
  );
}
