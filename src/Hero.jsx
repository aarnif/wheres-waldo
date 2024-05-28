import { motion } from "framer-motion";

const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      key={"hero"}
      className="w-full flex-grow min-h-[700px] mt-[60px] flex justify-center items-center bg-red-400"
      style={{
        backgroundImage: "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></motion.div>
  );
};

export default Hero;
