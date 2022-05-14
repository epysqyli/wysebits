import useMediaQuery from "./UseMediaQuery";

const useIsNarrow = () => useMediaQuery("(max-width: 768px)");

export { useIsNarrow };
