import {
  CreateUtilsUnitDto,
  EditUtilsUnitDto,
  MessageResponseDto,
  UtilsBrandControllerGetDataAsList200Response,
  UtilsUnitApiFp,
} from "@api/api";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { authHeaders } from "./auth-header";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { QueryKey } from "./query-key.enum";
import { getApiErrorMessage } from "@core/utility/get-error-message";

export function useGetUnit(
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
    const operation = await UtilsUnitApiFp().utilsUnitControllerGetDataAsList(
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
    queryKey: [QueryKey.Unit, search, limit, offset, order, filter],
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

export function useGetUnitById(
  id: string,
  onSuccess?:
    | ((
        data: UtilsBrandControllerGetDataAsList200Response
      ) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: AxiosError) => void | Promise<unknown>) | undefined
) {
  const { showProgress, hideProgress, showError } = useNotificationContext();
  const apiFn = async (search: string, limit = 1, offset = 0) => {
    showProgress();
    const operation = await UtilsUnitApiFp().utilsUnitControllerGetDataAsList(
      search,
      limit,
      offset,
      undefined,
      undefined,
      authHeaders()
    );
    const response = (await operation()).data;
    return response["data"] as UtilsBrandControllerGetDataAsList200Response;
  };

  return useQuery({
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

export function useAddUnit(
  onSuccess?:
    | ((data: MessageResponseDto) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: unknown) => void | Promise<unknown>) | undefined
) {
  const queryClient = useQueryClient();
  const { showProgress, hideProgress, showError } = useNotificationContext();

  const apiFn = async (payload: CreateUtilsUnitDto) => {
    showProgress();
    const operation = await UtilsUnitApiFp().utilsUnitControllerCreate(
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
      queryClient.invalidateQueries(QueryKey.Unit);
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

export function useEditUnit(
  onSuccess?:
    | ((data: MessageResponseDto) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: unknown) => void | Promise<unknown>) | undefined
) {
  const queryClient = useQueryClient();
  const { showProgress, hideProgress, showError } = useNotificationContext();

  const apiFn = async (payload: EditUtilsUnitDto) => {
    showProgress();
    const operation = await UtilsUnitApiFp().utilsUnitControllerEdit(
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
      queryClient.invalidateQueries(QueryKey.Unit);
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
