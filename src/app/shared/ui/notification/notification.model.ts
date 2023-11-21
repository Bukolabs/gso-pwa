import { SeverityClass } from "./severity-class.type";

export class ToastNotificationProperty {
  type: SeverityClass;
  header: string;
  message: string;

  constructor(header: string, message: string, type: SeverityClass) {
    this.type = type;
    this.header = header;
    this.message = message;
  }

  static Success(header: string, message: string) {
    return new ToastNotificationProperty(header, message, "success");
  }

  static Error(header: string, message: string) {
    return new ToastNotificationProperty(header, message, "error");
  }

  static Info(header: string, message: string) {
    return new ToastNotificationProperty(header, message, "info");
  }

  static Warning(header: string, message: string) {
    return new ToastNotificationProperty(header, message, "warn");
  }
}
export interface ProgressNotificationProperty {
  mode?: "determinate" | "indeterminate";
  show?: boolean;
  value?: number;
}
export interface NotificationState {
  toast?: ToastNotificationProperty;
  progress?: ProgressNotificationProperty;
}
export type NotificationAction =
  | {
      type: "SET_TOAST";
      payload: ToastNotificationProperty | undefined;
    }
  | { type: "SET_PROGRESS"; payload: ProgressNotificationProperty | undefined };
export const defaultNotificationState = {
  toast: undefined,
  progress: undefined,
};
