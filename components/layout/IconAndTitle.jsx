import Head from "next/dist/shared/lib/head";

const IconAndTitle = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="The best idea for every book."
      />
      <link rel="icon" href="/logo.png" />
    </Head>
  );
};

export default IconAndTitle;
