import { motion } from "framer-motion";

const FloatingBubble = ({ addStyle }) => {
  return (
    <div
      className={`h-3 w-3 bg-white rounded shadow-xl absolute ${addStyle}`}
    ></div>
  );
};

export default FloatingBubble;
