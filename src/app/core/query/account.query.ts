import {
  AddPersonDto,
  AdminChangePasswordDto,
  MessageResponseDto,
  PersonApiFp,
  PersonControllerGetDataAsList200Response,
  UpdatePersonDto,
  UtilitiesApiFp,
  UtilsBrandControllerGetDataAsList200Response,
} from "@api/api";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { authHeaders } from "./auth-header";
import { QueryKey } from "./query-key.enum";
import { AxiosError } from "axios";
import { getApiErrorMessage } from "@core/utility/get-error-message";
import { SETTINGS } from "@core/utility/settings";
import { useErrorAction } from "@core/utility/error-action.hook";
import { useUserIdentity } from "@core/utility/user-identity.hook";

export function useGetAccountQy(
  search: string,
  limit = 10,
  offset = 0,
  order?: object,
  filter?: Record<string, string>,
  enabled?: boolean,
  onSuccess?:
    | ((
        data: PersonControllerGetDataAsList200Response
      ) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: AxiosError) => void | Promise<unknown>) | undefined
) {
  const queryFilter = { ...filter };
  const { requestorDepartment } = useUserIdentity();
  const { showProgress, hideProgress, showError } = useNotificationContext();
  const { errorAction } = useErrorAction();
  const apiFn = async (
    search: string | undefined = undefined,
    limit: number | undefined = undefined,
    offset: number | undefined = undefined,
    order: object | undefined = undefined,
    filter: Record<string, string> | undefined = undefined
  ) => {
    showProgress();
    const operation = await PersonApiFp().personControllerGetDataAsList(
      search,
      limit,
      offset,
      order,
      JSON.stringify(filter) as any,
      authHeaders()
    );
    const response = (await operation()).data;
    return response["data"] as PersonControllerGetDataAsList200Response;
  };

  if (!!requestorDepartment) {
    queryFilter.department = requestorDepartment;
  }

  return useQuery({
    enabled,
    queryKey: [QueryKey.Account, search, limit, offset, order, queryFilter],
    queryFn: () => apiFn(search, limit, offset, order, queryFilter),
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
    onSettled() {
      hideProgress();
    },
  });
}

export function useGetAccountByIdQy(
  id: string,
  onSuccess?:
    | ((
        data: PersonControllerGetDataAsList200Response
      ) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: AxiosError) => void | Promise<unknown>) | undefined
) {
  const { showProgress, hideProgress, showError } = useNotificationContext();
  const { errorAction } = useErrorAction();
  const apiFn = async (id: string, search = "", limit = 1, offset = 0) => {
    showProgress();
    const operation = await PersonApiFp().personControllerGetDataAsList(
      search,
      limit,
      offset,
      undefined,
      JSON.stringify({ person_code: id }) as any,
      authHeaders()
    );
    const response = (await operation()).data;
    return response["data"] as PersonControllerGetDataAsList200Response;
  };

  return useQuery({
    queryKey: [QueryKey.Account, id],
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
      errorAction(err.response);

      if (onError) {
        onError(err);
      }
    },
    onSettled() {
      hideProgress();
    },
  });
}

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
    staleTime: SETTINGS.staleTime,
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

export function useEditPersonQy(
  onSuccess?:
    | ((data: MessageResponseDto) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: unknown) => void | Promise<unknown>) | undefined
) {
  const queryClient = useQueryClient();
  const { showProgress, hideProgress, showError } = useNotificationContext();

  const apiFn = async (payload: UpdatePersonDto) => {
    showProgress();
    const operation = await PersonApiFp().personControllerUpdatePerson(
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

export function useQyUpdatePassword(
  onSuccess?:
    | ((data: MessageResponseDto) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: unknown) => void | Promise<unknown>) | undefined
) {
  const queryClient = useQueryClient();
  const { showProgress, hideProgress, showError } = useNotificationContext();

  const apiFn = async (payload: AdminChangePasswordDto) => {
    showProgress();
    const operation = await PersonApiFp().personControllerChangePassword(
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