import { AxiosError } from "axios";
import { FieldErrors } from "react-hook-form";

export interface ApiResponseMessage {
  message: string[];
}

export const getApiErrorMessage = (
  error: AxiosError,
  defaultMessage?: string
): string => {
  const responseError = error.response?.data as ApiResponseMessage;

  if (responseError.message) {
    return responseError.message.join(". ");
  }
  if (defaultMessage) {
    return defaultMessage;
  }

  return "Something went wrong. Kindly refresh the page and try again. Or if problem persist, contact the administrators";
};

export const getFormErrorMessage = (error: FieldErrors) => {
  const messages = Object.keys(error).map((key) => error[key]?.message);
  const formMessages = messages.join(". ");
  return formMessages;
};
