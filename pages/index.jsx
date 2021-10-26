import Head from "next/head";
import Button from "../components/Button";
import Slider from "../components/Slider";

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3001/api/top_tiles");
  const entries = await res.json();
  return {
    props: {
      entries: entries.data,
    },
  };
};

export default function Home({ entries }) {
  return (
    <div>
      <Head>
        <title>Wysebits</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-60 mx-auto bg-library bg-cover bg-center mb-20 mt-10">
        <div className="bg-gray-900 h-full bg-opacity-80 relative">
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

      <form action="" className="mb-20">
        <input
          type="text"
          name=""
          id=""
          placeholder="Search for any book"
          className="block mx-auto w-4/6 transition-all duration-200 ease-out hover:w-5/6 focus:w-5/6 rounded-lg focus:ring-gray-700 focus:ring-2 outline-none focus:border-current focus:shadow-lg border-none shadow-md hover:shadow-lg text-center"
        />
      </form>

      <div className="mb-20">
        <p className="text-2xl w-4/5 mx-auto text-center mb-5">Check trending insights</p>
        <Slider entries={entries} />
      </div>

      <div className="mb-20 w-4/6 mx-auto">
        <Button text="Join to share your knowledge" />
      </div>

      <div className="pt-10 pb-20 bg-gray-100 shadow">
        <div className="w-4/5 mx-auto">
          <h3 className="text-3xl font-bold mb-5">What is Wysebits?</h3>
          <p className="text-justify">
            Wysebits's vision is that of organizing knowledge contained in
            non-fiction books.
          </p>

          <h4 className="text-xl font-bold mt-5 mb-3">Why should I care?</h4>
          <p className="text-justify">
            Every reader, in the curiosity-driven quest of knowledge building,
            has time and again encountered the annoying feeling of putting a
            book down without being able to easily recollect what the best
            takeways from the book were. You know that a couple of ideas in
            there were just great, and should never be forgotten. Yet they
            somehow fade away. No one likes that.
            <br />
            <span className="italic">
              Wysebits is my answer to this particular problem.
            </span>
          </p>

          <h4 className="text-xl font-bold mt-5 mb-3">What does it mean?</h4>
          <p className="text-justify">
            Wysebits is a collaborative effort at knowledge distillation. This
            means that those 2-3 incredibly great ideas found in a particular
            book now have a real chance to survive in the long term.
          </p>

          <h4 className="text-xl font-bold mt-5 mb-3">How does it work?</h4>
          <p className="text-justify">
            Read a non-fiction book. Post up to 3 ideas from the book that you
            consider important. Users can upvote and downvote each other's
            ideas, in order to allow for bottom-up knowledge discovery. This
            will allow, in due time, the emergence of the "best" idea from any
            given book.
          </p>

          <h4 className="text-xl font-bold mt-5 mb-3">
            How is it different from other websites?
          </h4>
          <p className="text-justify">
            This is not a place for quotes collections, book summaries, reviews,
            reading suggestions or the like. This is a place for the no-frills
            organization of knowledge, straight from the community.
          </p>
        </div>
      </div>

      <div className="h-60 mx-auto bg-home-banner bg-cover bg-center">
        <div className="bg-gray-900 h-full bg-opacity-80 relative">
          <div className="w-4/6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Button text="Join the community!" />
          </div>
        </div>
      </div>
    </div>
  );
}
