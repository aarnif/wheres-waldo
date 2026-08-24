import { useContext } from "react";
import NotificationContext from "../contexts/notification";

const useNotify = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotify must be used within a NotificationProvider");
  }
  return context;
};

export default useNotify;
