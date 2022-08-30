import Head from "next/dist/shared/lib/head";

const IconAndTitle = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content={description}
      />
      <link rel="icon" href="/logo.png" />
    </Head>
  );
};

export default IconAndTitle;
