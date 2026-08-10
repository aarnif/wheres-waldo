import { motion } from "motion/react";
import { MdClose } from "react-icons/md";

const Error = ({
  message,
  closeMessage,
}: {
  message: string;
  closeMessage: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 30 }}
    transition={{ duration: 0.3 }}
    className="text-md flex w-full items-center justify-between rounded-lg border-2 border-red-900 bg-red-900/70 px-4 py-3"
  >
    <p className="font-semibold text-red-400">{message}</p>
    <button
      data-testid="close-notify-message"
      type="button"
      onClick={closeMessage}
      className="cursor-pointer"
    >
      <MdClose className="h-5 w-5 text-red-400 hover:text-red-500" />
    </button>
  </motion.div>
);

export default Error;
