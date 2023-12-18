import { LoginPersonDto, LoginResponseDto, OauthApiFp } from "@api/api";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { useMutation, useQueryClient } from "react-query";
import { QueryKey } from "./query-key.enum";
import { AxiosError } from "axios";
import { getApiErrorMessage } from "@core/utility/get-error-message";

export function useLoginQy(
  onSuccess?: ((data: LoginResponseDto) => void | Promise<unknown>) | undefined,
  onError?: ((error: unknown) => void | Promise<unknown>) | undefined
) {
  const queryClient = useQueryClient();
  const { showProgress, hideProgress, showError } = useNotificationContext();

  const apiFn = async (payload: LoginPersonDto) => {
    showProgress();
    const operation = await OauthApiFp().oauthControllerLogin(payload);
    const response = (await operation()).data as any;
    return response["data"] as LoginResponseDto;
  };

  return useMutation({
    mutationFn: apiFn,
    onSuccess: (response) => {
      hideProgress();
      queryClient.invalidateQueries(QueryKey.Authentication);
      if (onSuccess) {
        onSuccess(response);
      }
    },
    onError: (err: AxiosError) => {
      hideProgress();
      const message = getApiErrorMessage(err);
      showError(message);
      if (onError) {
        onError(err);
      }
    },
  });
}
