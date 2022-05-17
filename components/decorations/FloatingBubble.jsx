import { motion } from "framer-motion";

const FloatingBubble = ({ addStyle }) => {
  return (
    <motion.div
      animate={{ margin: [2, 10, 2], scale: [1, 0.75, 1] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className={`h-3 w-3 bg-white rounded shadow-xl absolute ${addStyle}`}
    ></motion.div>
  );
};

export default FloatingBubble;
