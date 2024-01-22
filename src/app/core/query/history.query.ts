import {
  TransactionHistoryApiFp,
  TransactionHistoryControllerGetDataAsList200Response,
} from "@api/api";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { authHeaders } from "./auth-header";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { QueryKey } from "./query-key.enum";
import { getApiErrorMessage } from "@core/utility/get-error-message";

export function useGetHistoryQy(
  id: string,
  enabled?: boolean,
  onSuccess?:
    | ((
        data: TransactionHistoryControllerGetDataAsList200Response
      ) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: AxiosError) => void | Promise<unknown>) | undefined
) {
  const { showProgress, hideProgress, showError } = useNotificationContext();
  const apiFn = async (id: string, search = "", limit = 9999, offset = 0) => {
    showProgress();
    const operation =
      await TransactionHistoryApiFp().transactionHistoryControllerGetDataAsList(
        search,
        limit,
        offset,
        undefined,
        JSON.stringify({ request_code: id }) as any,
        authHeaders()
      );
    const response = (await operation()).data;
    return response[
      "data"
    ] as TransactionHistoryControllerGetDataAsList200Response;
  };

  return useQuery({
    enabled,
    queryKey: [QueryKey.Unit, id],
    queryFn: () => apiFn(id),
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
  });
}
