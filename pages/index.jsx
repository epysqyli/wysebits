import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Wysebits</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="md:container mx-auto">
        <div className="bg-gray-300 h-12 shadow-sm"></div>
      </div>
    </div>
  );
}
