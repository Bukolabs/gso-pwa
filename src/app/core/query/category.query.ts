import {
  CreateUtilsCategoryDto,
  MessageResponseDto,
  UtilsBrandControllerGetDataAsList200Response,
  UtilsCateogryApiFp,
} from "@api/api";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { authHeaders } from "./auth-header";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { QueryKey } from "./query-key.enum";
import { getApiErrorMessage } from "@core/utility/get-error-message";
import { SETTINGS } from "@core/utility/settings";

export function useQyGetCategory(
  enabled?: boolean,
  onSuccess?:
    | ((
        data: UtilsBrandControllerGetDataAsList200Response
      ) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: AxiosError) => void | Promise<unknown>) | undefined
) {
  const { showProgress, hideProgress, showError } = useNotificationContext();
  const apiFn = async () => {
    showProgress();
    const operation =
      await UtilsCateogryApiFp().utilsCategoryControllerGetDataAsList(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        authHeaders()
      );
    const response = (await operation()).data;
    return response["data"] as UtilsBrandControllerGetDataAsList200Response;
  };

  return useQuery({
    enabled,
    queryKey: [QueryKey.Category],
    queryFn: () => apiFn(),
    onSuccess: (response) => {
      hideProgress();
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
    staleTime: SETTINGS.staleTime,
  });
}

export function useAddCategory(
  onSuccess?:
    | ((data: MessageResponseDto) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: unknown) => void | Promise<unknown>) | undefined
) {
  const queryClient = useQueryClient();
  const { showProgress, hideProgress, showError } = useNotificationContext();

  const apiFn = async (payload: CreateUtilsCategoryDto) => {
    showProgress();
    const operation = await UtilsCateogryApiFp().utilsCategoryControllerCreate(
      payload,
      authHeaders()
    );
    const response = (await operation()).data;
    return response["message"] as MessageResponseDto;
  };

  return useMutation({
    mutationFn: apiFn,
    onSuccess: (response) => {
      hideProgress();
      queryClient.invalidateQueries(QueryKey.Category);
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
