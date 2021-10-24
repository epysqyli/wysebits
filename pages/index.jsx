import Head from "next/head";
import styles from '../styles/index.module.scss';

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
      </div>

      <div className={styles.example}>This is some red text</div>
    </div>
  );
}
