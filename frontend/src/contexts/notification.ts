import { createContext } from "react";
import type { NotificationType } from "../types";

export interface NotificationContextValue {
  notify: (
    message: string,
    type: NotificationType,
    autoDismiss?: boolean,
  ) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(
  null,
);

export default NotificationContext;
