import { useRef, useState, type ReactNode } from "react";
import NotificationContext from "../contexts/notification";
import type { Notification, NotificationType } from "../types";
import NotificationList from "./NotificationList";

const NOTIFICATION_DURATION = 3000;

const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const timeoutIdsRef = useRef<Map<number, number>>(new Map());
  const nextId = useRef(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notify = (
    message: string,
    type: NotificationType,
    autoDismiss: boolean = false,
  ) => {
    const id = nextId.current++;

    setNotifications((prev) => [{ id, message, type }, ...prev]);

    if (autoDismiss) {
      const timeoutId = setTimeout(() => {
        dismiss(id);
      }, NOTIFICATION_DURATION);
      timeoutIdsRef.current.set(id, timeoutId);
    }
  };

  const dismiss = (id: number) => {
    const timeoutId = timeoutIdsRef.current.get(id);
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutIdsRef.current.delete(id);
    }
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  };

  const clearAll = () => {
    timeoutIdsRef.current.forEach(clearTimeout);
    timeoutIdsRef.current.clear();
    setNotifications([]);
  };
  return (
    <NotificationContext.Provider value={{ notify, clearAll }}>
      {children}
      <NotificationList notifications={notifications} dismiss={dismiss} />
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
