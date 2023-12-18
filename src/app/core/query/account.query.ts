import {
  AddPersonDto,
  MessageResponseDto,
  PersonApiFp,
  UtilitiesApiFp,
  UtilsBrandControllerGetDataAsList200Response,
} from "@api/api";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { authHeaders } from "./auth-header";
import { QueryKey } from "./query-key.enum";
import { AxiosError } from "axios";
import { getApiErrorMessage } from "@core/utility/get-error-message";



export function useGetRoleQy(
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
      await UtilitiesApiFp().utilitiesControllerGetUtilsRoleDataAsList(
        authHeaders()
      );
    const response = (await operation()).data;
    return response["data"] as UtilsBrandControllerGetDataAsList200Response;
  };

  return useQuery({
    queryKey: [QueryKey.Role],
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
  });
}

export function useAddPersonQy(
  onSuccess?:
    | ((data: MessageResponseDto) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: unknown) => void | Promise<unknown>) | undefined
) {
  const queryClient = useQueryClient();
  const { showProgress, hideProgress, showError } = useNotificationContext();

  const apiFn = async (payload: AddPersonDto) => {
    showProgress();
    const operation = await PersonApiFp().personControllerAddPerson(
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
      queryClient.invalidateQueries(QueryKey.Account);
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
