import Head from "next/head";
import Button from "../../components/navigation/Button";
import Link from "next/dist/client/link";

const About = ({ userState }) => {
  return (
    <>
      <Head>
        <title>About Wysebits</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="animate-show-up">
        <div className="h-60 mx-auto bg-discovery bg-no-repeat bg-cover bg-center">
          <div className="bg-gray-800 h-full bg-opacity-80 relative">
            <div className="w-4/6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="text-3xl font-bold text-gray-200 text-center">
                About this place ...
              </div>
            </div>
          </div>
        </div>

        <div className="pt-10 pb-20 shadow">
          <div className="w-4/5 md:w-4/6 lg:w-3/5 xl:w-2/5 mx-auto">
            <h3 className="text-3xl font-bold mb-5">What is Wysebits?</h3>
            <p className="text-justify text-gray-800">
              Wysebits's vision is that of organizing knowledge contained in
              non-fiction books, so that for every book the most important idea
              can be identified.
            </p>

            <h4 className="text-xl text-gray-800 tracking-tight font-bold mt-5 mb-3">
              Why should I care?
            </h4>
            <p className="text-justify text-gray-800">
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

            <h4 className="text-xl text-gray-800 tracking-tight font-bold mt-5 mb-3">
              What does it mean?
            </h4>
            <p className="text-justify text-gray-800">
              Wysebits is a collaborative effort at knowledge distillation. This
              means that those incredibly great ideas found in a particular book
              now have a real chance to survive in the long term.
            </p>

            <h4 className="text-xl text-gray-800 tracking-tight font-bold mt-5 mb-3">
              How does it work?
            </h4>
            <p className="text-justify text-gray-800">
              Read a non-fiction book. Post three ideas from the book that you
              consider important. Users can upvote and downvote each other's
              ideas, in order to allow for bottom-up knowledge discovery. This
              will allow, in due time, for the emergence of the "best" idea from
              any given book.
            </p>

            <h4 className="text-xl text-gray-800 tracking-tight font-bold mt-5 mb-3">
              How is it different from other platforms?
            </h4>
            <p className="text-justify text-gray-800">
              This is not a place for quotes collections, book summaries,
              reviews, reading suggestions or the like. This is a place for the
              no-frills organization of knowledge, straight from the community.
              Above all, it's not a place for mindless scrolling.
            </p>

            <h4 className="text-xl text-center text-gray-800 tracking-tight font-bold mt-20 mb-3">
              Wysebits is possible thanks to OpenLibrary
            </h4>
            <p className="text-justify text-gray-800">
              This project would not be possible in its current form were it not
              for the data made freely available by{" "}
              <a href="https://openlibrary.org/about" className="underline">
                Open Library
              </a>
              . I am incredibly grateful.
            </p>

            {userState.isLogged ? null : (
              <Link href="/registrations/signup">
                <a className="block mt-20 md:w-4/5 mx-auto">
                  <Button text="Sign up now and start contributing your insights to the community!" />
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
