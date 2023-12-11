import { ReactNode, createContext, useContext } from "react";
import { useNotification } from "./notification.hook";

const NotificationContext = createContext(
  {} as ReturnType<typeof useNotification>
);
export function useNotificationContext() {
  return useContext(NotificationContext);
}

interface NotificationProviderProps {
  children: ReactNode;
}
export function NotificationProvider({ children }: NotificationProviderProps) {
  return (
    <NotificationContext.Provider value={useNotification()}>
      {children}
    </NotificationContext.Provider>
  );
}
