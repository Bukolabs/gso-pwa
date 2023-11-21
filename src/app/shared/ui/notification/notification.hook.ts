import { useReducer, useRef } from "react";
import {
  NotificationState,
  NotificationAction,
  defaultNotificationState,
  ToastNotificationProperty,
  ProgressNotificationProperty,
} from "./notification.model";

export function useNotification() {
  const [{ progress, toast }, dispatch] = useReducer(
    (state: NotificationState, action: NotificationAction) => {
      switch (action.type) {
        case "SET_TOAST":
          return { ...state, toast: action.payload };
        case "SET_PROGRESS":
          return { ...state, progress: action.payload };
      }
    },
    defaultNotificationState
  );

  const toastRef = useRef<any>();
  const showToast = (toast: ToastNotificationProperty) => {
    toastRef.current.show({
      severity: toast?.type,
      summary: toast?.header,
      detail: toast?.message,
      life: 5000,
    });
  };

  const success = (message: string, header = "Success") => {
    const payload = ToastNotificationProperty.Success(header, message);
    dispatch({ type: "SET_TOAST", payload });
    showToast(payload);
  };

  const error = (message: string, header = "Error") => {
    const payload = ToastNotificationProperty.Error(header, message);
    dispatch({ type: "SET_TOAST", payload });
    showToast(payload);
  };

  const info = (message: string, header = "Information") => {
    const payload = ToastNotificationProperty.Info(header, message);
    dispatch({ type: "SET_TOAST", payload });
    showToast(payload);
  };

  const warning = (message: string, header = "Warning") => {
    const payload = ToastNotificationProperty.Warning(header, message);
    dispatch({ type: "SET_TOAST", payload });
    showToast(payload);
  };

  const show = () => {
    const payload = {
      show: true,
    } as ProgressNotificationProperty;
    dispatch({ type: "SET_PROGRESS", payload });
  };
  const hide = () => {
    const payload = {
      show: false,
    } as ProgressNotificationProperty;
    dispatch({ type: "SET_PROGRESS", payload });
  };
  const toggle = () => {
    const payload = {
      show: !progress?.show,
    } as ProgressNotificationProperty;
    dispatch({ type: "SET_PROGRESS", payload });
  };

  return {
    progress,
    toast,
    toastRef,
    success,
    error,
    info,
    warning,
    show,
    hide,
    toggle,
  };
}
