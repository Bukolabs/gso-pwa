import {
  CreateInventoryStatusDto,
  InventoryApiFp,
  InventoryControllerGetDataAsList200Response,
  InventoryStatusApiFp,
  MessageResponseDto,
  MonitorPIDDto,
  PurchaseRequestItemDeliveryApiFp,
  UtilsBrandControllerGetDataAsList200Response,
} from "@api/api";
import { useErrorAction } from "@core/utility/error-action.hook";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { authHeaders } from "./auth-header";
import { QueryKey } from "./query-key.enum";
import { AxiosError } from "axios";
import { getApiErrorMessage } from "@core/utility/get-error-message";

export function useQyAddInventory(
  onSuccess?:
    | ((data: MessageResponseDto) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: unknown) => void | Promise<unknown>) | undefined
) {
  const queryClient = useQueryClient();
  const { showProgress, hideProgress, showError } = useNotificationContext();
  const { errorAction } = useErrorAction();

  const apiFn = async (payload: CreateInventoryStatusDto) => {
    showProgress();
    const operation =
      await InventoryStatusApiFp().inventoryStatusControllerCreate(
        payload,
        authHeaders()
      );
    const response = (await operation()).data;
    return response as MessageResponseDto;
  };

  return useMutation({
    mutationFn: apiFn,
    onSuccess: (response) => {
      hideProgress();
      queryClient.invalidateQueries(QueryKey.Inventory);
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

export function useQyGetInventory(
  search: string,
  limit = 10,
  offset = 0,
  order?: object,
  filter?: Record<string, string>,
  dateName?: string,
  startDate?: string,
  endDate?: string,
  enabled?: boolean,
  onSuccess?:
    | ((
        data: InventoryControllerGetDataAsList200Response
      ) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: AxiosError) => void | Promise<unknown>) | undefined
) {
  const { showProgress, hideProgress, showError } = useNotificationContext();
  const { errorAction } = useErrorAction();
  const apiFn = async (
    search: string | undefined = undefined,
    limit: number | undefined = undefined,
    offset: number | undefined = undefined,
    order: object | undefined = undefined,
    filter: Record<string, string> | undefined = undefined,
    dateName: string | undefined = undefined,
    startDate: string | undefined = undefined,
    endDate: string | undefined = undefined
  ) => {
    showProgress();
    const operation = await InventoryApiFp().inventoryControllerGetDataAsList(
      search,
      limit,
      offset,
      order,
      JSON.stringify(filter) as any,
      dateName,
      startDate,
      endDate,
      authHeaders()
    );
    const response = (await operation()).data;
    return response["data"] as InventoryControllerGetDataAsList200Response;
  };

  return useQuery({
    enabled,
    queryKey: [
      QueryKey.Inventory,
      search,
      limit,
      offset,
      order,
      filter,
      dateName,
      startDate,
      endDate,
    ],
    queryFn: () =>
      apiFn(search, limit, offset, order, filter, dateName, startDate, endDate),
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

export function useQyGetInventoryById(
  id: string,
  onSuccess?:
    | ((
        data: InventoryControllerGetDataAsList200Response
      ) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: AxiosError) => void | Promise<unknown>) | undefined
) {
  const { showProgress, hideProgress, showError } = useNotificationContext();
  const { errorAction } = useErrorAction();
  const apiFn = async (id: string, search = "", limit = 1, offset = 0) => {
    showProgress();
    const operation =
      await InventoryApiFp().inventoryControllerGetDataAsList(
        search,
        limit,
        offset,
        undefined,
        JSON.stringify({ code: id }) as any,
        undefined,
        undefined,
        undefined,
        authHeaders()
      );
    const response = (await operation()).data;
    return response["data"] as InventoryControllerGetDataAsList200Response;
  };

  return useQuery({
    queryKey: [QueryKey.Inventory, id],
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

export function useQyGetInventoryStatus(
  search: string,
  limit = 10,
  offset = 0,
  order?: object,
  filter?: Record<string, string>,
  enabled?: boolean,
  onSuccess?:
    | ((
        data: InventoryControllerGetDataAsList200Response
      ) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: AxiosError) => void | Promise<unknown>) | undefined
) {
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
    const operation =
      await InventoryStatusApiFp().inventoryStatusControllerGetDataAsList(
        search,
        limit,
        offset,
        order,
        JSON.stringify(filter) as any,
        authHeaders()
      );
    const response = (await operation()).data;
    return response["data"] as InventoryControllerGetDataAsList200Response;
  };

  return useQuery({
    enabled,
    queryKey: [QueryKey.InventoryStatus, search, limit, offset, order, filter],
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

export function useQyMonitorForInventory(
  onSuccess?:
    | ((data: MessageResponseDto) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: unknown) => void | Promise<unknown>) | undefined
) {
  const queryClient = useQueryClient();
  const { showProgress, hideProgress, showError } = useNotificationContext();
  const { errorAction } = useErrorAction();

  const apiFn = async (payload: MonitorPIDDto) => {
    showProgress();
    const operation =
      await PurchaseRequestItemDeliveryApiFp().prItemDeliveryControllerMonitor(
        payload,
        authHeaders()
      );
    const response = (await operation()).data;
    return response as MessageResponseDto;
  };

  return useMutation({
    mutationFn: apiFn,
    onSuccess: (response) => {
      hideProgress();
      queryClient.invalidateQueries(QueryKey.Inventory);
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
