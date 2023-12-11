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

  const showSuccess = (message: string, header = "Success") => {
    const payload = ToastNotificationProperty.Success(header, message);
    dispatch({ type: "SET_TOAST", payload });
    showToast(payload);
  };

  const showError = (message: string, header = "Error") => {
    const payload = ToastNotificationProperty.Error(header, message);
    dispatch({ type: "SET_TOAST", payload });
    showToast(payload);
  };

  const showInfo = (message: string, header = "Information") => {
    const payload = ToastNotificationProperty.Info(header, message);
    dispatch({ type: "SET_TOAST", payload });
    showToast(payload);
  };

  const showWarning = (message: string, header = "Warning") => {
    const payload = ToastNotificationProperty.Warning(header, message);
    dispatch({ type: "SET_TOAST", payload });
    showToast(payload);
  };

  const showProgress = () => {
    const payload = {
      show: true,
    } as ProgressNotificationProperty;
    dispatch({ type: "SET_PROGRESS", payload });
  };
  const hideProgress = () => {
    const payload = {
      show: false,
    } as ProgressNotificationProperty;
    dispatch({ type: "SET_PROGRESS", payload });
  };
  const toggleProgress = () => {
    const payload = {
      show: !progress?.show,
    } as ProgressNotificationProperty;
    dispatch({ type: "SET_PROGRESS", payload });
  };

  return {
    progress,
    toast,
    toastRef,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    showProgress,
    hideProgress,
    toggleProgress,
  };
}
