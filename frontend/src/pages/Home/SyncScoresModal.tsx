import { useState } from "react";
import { motion } from "motion/react";

const SyncScoresModal = ({
  handleSync,
  handleDismiss,
}: {
  handleSync: () => Promise<void>;
  handleDismiss: () => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await handleSync();
    setIsSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onClick={handleDismiss}
      data-testid="sync-scores-overlay"
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
          type: "spring",
          stiffness: 400,
          damping: 20,
          mass: 0.8,
        }}
        onClick={(event) => event.stopPropagation()}
        className="z-10 w-full max-w-120 rounded-lg border border-slate-600/40 bg-slate-600/20 p-4 shadow-lg backdrop-blur-sm"
      >
        <h1 className="font-title mb-4 text-2xl font-black text-red-600">
          Save your scores?
        </h1>
        <p className="mb-6 text-slate-100">
          You played some games as a guest. Saving will keep your{" "}
          <span className="font-bold text-white">best time</span> for each game
          and <span className="font-bold text-white">delete</span> the local
          scores from this device.
        </p>
        <div className="flex gap-4 text-white">
          <button
            onClick={handleDismiss}
            className="grow cursor-pointer rounded-lg bg-slate-500 py-1.5 text-sm font-bold shadow-[3px_3px_0px_0px] shadow-slate-950 transition-all duration-300 hover:bg-slate-600 active:translate-x-0.75 active:translate-y-0.75 active:shadow-none sm:py-2 sm:text-base"
          >
            Not Now
          </button>
          <button
            onClick={handleSubmit}
            className="grow cursor-pointer rounded-lg bg-red-600 py-1.5 text-sm font-bold shadow-[3px_3px_0px_0px] shadow-slate-950 transition-all duration-300 hover:bg-red-700 active:translate-x-0.75 active:translate-y-0.75 active:shadow-none sm:py-2 sm:text-base"
          >
            {isSubmitting ? "Saving Scores..." : "Save Scores"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SyncScoresModal;
