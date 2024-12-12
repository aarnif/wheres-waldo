import { motion } from "framer-motion";
import LoadingIcon from "../LoadingIcon";

const LoadingPage = () => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <div className="relative bottom-12 flex flex-col items-center">
        <img src="/images/hero.png" alt="Wheres Waldo logo" />
        <div className="relative top-8">
          <LoadingIcon loadingText="Loading page..." />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingPage;
