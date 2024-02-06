import {
  UtilsBrandControllerGetDataAsList200Response,
  UtilsStatusApiFp,
} from "@api/api";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { authHeaders } from "./auth-header";
import { QueryCache, useQuery } from "react-query";
import { QueryKey } from "./query-key.enum";
import { AxiosError } from "axios";
import { getApiErrorMessage } from "@core/utility/get-error-message";
import { SETTINGS } from "@core/utility/settings";
import { useErrorAction } from "@core/utility/error-action.hook";

export function useGetStatusQy(
  enabled?: boolean,
  onSuccess?:
    | ((
        data: UtilsBrandControllerGetDataAsList200Response
      ) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: AxiosError) => void | Promise<unknown>) | undefined
) {
  const { showProgress, hideProgress, showError } = useNotificationContext();
  const { errorAction } = useErrorAction();

  const apiFn = async () => {
    showProgress();
    const operation =
      await UtilsStatusApiFp().utilsStatusControllerGetDataAsList(
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
    queryKey: [QueryKey.Status],
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
      errorAction(err.response);
      
      if (onError) {
        onError(err);
      }
    },
    staleTime: SETTINGS.staleTime
  });
}

export function useFindStatusCacheQy(
  onError?: (error: any) => void,
  onSuccess?: (data: any) => void
) {
  const queryCache = new QueryCache({
    onError: (error) => {
      console.log(error);
      if (onError) {
        onError(error);
      }
    },
    onSuccess: (data) => {
      console.log(data);
      if (onSuccess) {
        onSuccess(data);
      }
    },
  });

  return queryCache.findAll(QueryKey.Status);
}
