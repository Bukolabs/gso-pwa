import {
  UtilsBrandControllerGetDataAsList200Response,
  UtilsDepartmentApiFp,
} from "@api/api";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { AxiosError } from "axios";
import { authHeaders } from "./auth-header";
import { useQuery } from "react-query";
import { QueryKey } from "./query-key.enum";
import { getApiErrorMessage } from "@core/utility/get-error-message";

export function useGetDepartmentQy(
  search: string,
  limit = 10,
  offset = 0,
  order?: object,
  filter?: Record<string, string>,
  enabled?: boolean,
  onSuccess?:
    | ((
        data: UtilsBrandControllerGetDataAsList200Response
      ) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: AxiosError) => void | Promise<unknown>) | undefined
) {
  const { showProgress, hideProgress, showError } = useNotificationContext();
  const apiFn = async (
    search: string | undefined = undefined,
    limit: number | undefined = undefined,
    offset: number | undefined = undefined,
    order: object | undefined = undefined,
    filter: Record<string, string> | undefined = undefined
  ) => {
    showProgress();
    const operation =
      await UtilsDepartmentApiFp().utilsDepartmentControllerGetDataAsList(
        search,
        limit,
        offset,
        order,
        filter,
        authHeaders()
      );
    const response = (await operation()).data;
    return response["data"] as UtilsBrandControllerGetDataAsList200Response;
  };

  return useQuery({
    enabled,
    queryKey: [QueryKey.Department, search, limit, offset, order, filter],
    queryFn: () => apiFn(search, limit, offset, order, filter),
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
