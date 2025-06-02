import { motion } from "framer-motion";
import Title from "../Title";
import LoadingIcon from "./LoadingIcon";

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-stars bg-repeat bg-[length:20px_20px]">
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
        className="mt-[-2rem] flex flex-col items-center"
      >
        <img src="/images/hero.png" alt="Wheres Waldo logo" />
        <div className="mt-8">
          <LoadingIcon loadingText="Loading page..." />
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingPage;
