import { useState } from "react";
import EntryGuestTitle from "../books/tile-entry-components/EntryGuestTitle";
import EntryLoggedTitle from "../books/tile-entry-components/EntryLoggedTitle";

const LatestEntries = ({ entries, isLogged }) => {
  if (isLogged) {
    return (
      <div>
        <div className="text-center text-gray-800 text-3xl">
          Latest insights
        </div>
        {/* {entries.map((entry) => <EntryLoggedTitle />)} */}
      </div>
    );
  } else {
    return (
      <div>
        <div className="text-center text-gray-800 text-3xl">
          Latest insights
        </div>
        {entries.map((entry) => {
          return (
            <div className="m-10">
              <EntryGuestTitle data={entry} key={entry.id} />
            </div>
          );
        })}
      </div>
    );
  }
};

export default LatestEntries;
