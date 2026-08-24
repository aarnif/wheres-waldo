import { AnimatePresence, motion } from "motion/react";
import { MdClose } from "react-icons/md";
import type { Notification, NotificationType } from "../types";

const typeStyles: Record<NotificationType, { text: string; hover: string }> = {
  success: {
    text: "text-green-300",
    hover: "hover:text-green-400",
  },
  error: {
    text: "text-red-300",
    hover: "hover:text-red-400",
  },
};

const NotificationList = ({
  notifications,
  dismiss,
}: {
  notifications: Notification[];
  dismiss: (id: number) => void;
}) => (
  <div className="fixed top-16 right-4 left-4 z-100 flex flex-col gap-2 sm:left-auto sm:w-full sm:max-w-80">
    <AnimatePresence mode="popLayout">
      {notifications.map(({ id, message, type }) => {
        const styles = typeStyles[type];

        return (
          <motion.div
            key={id}
            layout
            data-testid={`notification-${type}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: 40,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 20,
              mass: 0.8,
            }}
            className="text-md flex items-center justify-between gap-4 rounded-lg border-2 border-slate-600/40 bg-slate-600/40 px-4 py-3 shadow-lg backdrop-blur-xl"
          >
            <p
              title={message}
              className={`min-w-0 truncate font-semibold ${styles.text}`}
            >
              {message}
            </p>
            <button
              type="button"
              data-testid="notification-close-button"
              onClick={() => dismiss(id)}
              className="cursor-pointer"
            >
              <MdClose className={`h-5 w-5 ${styles.text} ${styles.hover}`} />
            </button>
          </motion.div>
        );
      })}
    </AnimatePresence>
  </div>
);

export default NotificationList;
