const About = () => {
  return (
    <div className="pt-10 pb-20 bg-gray-100 shadow">
      <div className="w-4/5 mx-auto">
        <h3 className="text-3xl font-bold mb-5">What is Wysebits?</h3>
        <p className="text-justify">
          Wysebits's vision is that of organizing knowledge contained in
          non-fiction books, so that for every book the most important idea can
          be identified.
        </p>

        <h4 className="text-xl font-bold mt-5 mb-3">Why should I care?</h4>
        <p className="text-justify">
          Every reader, in the curiosity-driven quest of knowledge building, has
          time and again encountered the annoying feeling of putting a book down
          without being able to easily recollect what the best takeways from the
          book were. You know that a couple of ideas in there were just great,
          and should never be forgotten. Yet they somehow fade away. No one
          likes that.
          <br />
          <span className="italic">
            Wysebits is my answer to this particular problem.
          </span>
        </p>

        <h4 className="text-xl font-bold mt-5 mb-3">What does it mean?</h4>
        <p className="text-justify">
          Wysebits is a collaborative effort at knowledge distillation. This
          means that those incredibly great ideas found in a particular book now
          have a real chance to survive in the long term.
        </p>

        <h4 className="text-xl font-bold mt-5 mb-3">How does it work?</h4>
        <p className="text-justify">
          Read a non-fiction book. Post up to 3 ideas from the book that you
          consider important. Users can upvote and downvote each other's ideas,
          in order to allow for bottom-up knowledge discovery. This will allow,
          in due time, the emergence of the "best" idea from any given book.
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
  );
};

export default About;
