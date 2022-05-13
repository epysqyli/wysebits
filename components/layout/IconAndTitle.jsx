import Head from "next/dist/shared/lib/head";

const IconAndTitle = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="The no-frills social network for book lovers. Knowledge: distilled. Share your insights for the books you have and explore other users' ideas."
      />
      <link rel="icon" href="/logo.png" />
    </Head>
  );
};

export default IconAndTitle;
