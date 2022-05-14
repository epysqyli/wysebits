import { useEffect, useState } from "react";

const useMediaQuery = (query) => {
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== isMatch) setIsMatch(media.matches);
    window.addEventListener("resize", () => setIsMatch(media.matches));

    return () =>
      window.removeEventListener("resize", () => setIsMatch(media.matches));
  }, [isMatch]);

  return isMatch;
};

export default useMediaQuery;
