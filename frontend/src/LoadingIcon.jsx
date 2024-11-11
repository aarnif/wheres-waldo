import Icon from "@mdi/react";
import { mdiCircleOutline, mdiLoading } from "@mdi/js";
import { motion } from "framer-motion";

const LoadingIcon = () => {
  return (
    <motion.div
      animate={{ rotate: [0, 90, 180, 270, 360] }}
      transition={{ repeat: Infinity }}
      className="relative flex justify-center items-center"
    >
      <Icon
        path={mdiCircleOutline}
        size={3}
        className="absolute fill-current text-zinc-800 opacity-70"
      />
      <Icon
        path={mdiLoading}
        size={3}
        className="absolute fill-current text-white"
      />
    </motion.div>
  );
};

export default LoadingIcon;
