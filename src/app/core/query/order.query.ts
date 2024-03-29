import {
  CreatePoPrDto,
  CreatePurchaseOrderDto,
  DeletePoPrDto,
  DeletePurchaseOrderDto,
  EditPurchaseOrderDto,
  MessageResponseDto,
  ProcessPurchaseOrderDto,
  CreatePIDDto,
  PurchaseOrderApiFp,
  PurchaseOrderControllerGetDataAsList200Response,
  PurchaseOrderPurchaseRequestApiFp,
  PurchaseRequestItemDeliveryApiFp,
  DeletePIDDto,
} from "@api/api";
import { AxiosError } from "axios";
import { authHeaders } from "./auth-header";
import { useErrorAction } from "@core/utility/error-action.hook";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { QueryKey } from "./query-key.enum";
import { getApiErrorMessage } from "@core/utility/get-error-message";

export function useGetOrderQy(
  search: string,
  limit = 10,
  offset = 0,
  order?: object,
  filter?: Record<string, string>,
  enabled?: boolean,
  onSuccess?:
    | ((
        data: PurchaseOrderControllerGetDataAsList200Response
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
      await PurchaseOrderApiFp().purchaseOrderControllerGetDataAsList(
        search,
        limit,
        offset,
        order,
        JSON.stringify(filter) as any,
        authHeaders()
      );
    const response = (await operation()).data;
    return response["data"] as PurchaseOrderControllerGetDataAsList200Response;
  };

  return useQuery({
    enabled,
    queryKey: [QueryKey.Order, search, limit, offset, order, filter],
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

export function useGetOrderByIdQy(
  id: string,
  enabled: boolean = true,
  onSuccess?:
    | ((
        data: PurchaseOrderControllerGetDataAsList200Response
      ) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: AxiosError) => void | Promise<unknown>) | undefined
) {
  const { showProgress, hideProgress, showError } = useNotificationContext();
  const { errorAction } = useErrorAction();
  const apiFn = async (id: string, search = "", limit = 1, offset = 0) => {
    showProgress();
    const operation =
      await PurchaseOrderApiFp().purchaseOrderControllerGetDataAsList(
        search,
        limit,
        offset,
        undefined,
        JSON.stringify({ code: id }) as any,
        authHeaders()
      );
    const response = (await operation()).data;
    return response["data"] as PurchaseOrderControllerGetDataAsList200Response;
  };

  return useQuery({
    queryKey: [QueryKey.Order, id],
    enabled: enabled,
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

export function useAddOrderQy(
  onSuccess?:
    | ((data: MessageResponseDto) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: unknown) => void | Promise<unknown>) | undefined
) {
  const queryClient = useQueryClient();
  const { showProgress, hideProgress, showError } = useNotificationContext();
  const { errorAction } = useErrorAction();

  const apiFn = async (payload: CreatePurchaseOrderDto) => {
    showProgress();
    const operation = await PurchaseOrderApiFp().purchaseOrderControllerCreate(
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
      queryClient.invalidateQueries(QueryKey.Order);
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

export function useEditOrderQy(
  onSuccess?:
    | ((data: MessageResponseDto) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: unknown) => void | Promise<unknown>) | undefined
) {
  const queryClient = useQueryClient();
  const { showProgress, hideProgress, showError } = useNotificationContext();
  const { errorAction } = useErrorAction();

  const apiFn = async (payload: EditPurchaseOrderDto) => {
    showProgress();
    const operation = await PurchaseOrderApiFp().purchaseOrderControllerEdit(
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
      queryClient.invalidateQueries(QueryKey.Order);
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

export function useAddRequestToOrderQy(
  onSuccess?:
    | ((data: MessageResponseDto) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: unknown) => void | Promise<unknown>) | undefined
) {
  const queryClient = useQueryClient();
  const { showProgress, hideProgress, showError } = useNotificationContext();
  const { errorAction } = useErrorAction();

  const apiFn = async (payload: CreatePoPrDto) => {
    showProgress();
    const operation =
      await PurchaseOrderPurchaseRequestApiFp().poPrControllerCreate(
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
      queryClient.invalidateQueries(QueryKey.RequestsInOrder);
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

export function useProcessOrderQy(
  onSuccess?:
    | ((data: MessageResponseDto) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: unknown) => void | Promise<unknown>) | undefined
) {
  const queryClient = useQueryClient();
  const { showProgress, hideProgress, showError } = useNotificationContext();
  const { errorAction } = useErrorAction();

  const apiFn = async (payload: ProcessPurchaseOrderDto) => {
    showProgress();
    const operation = await PurchaseOrderApiFp().purchaseOrderControllerProcess(
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
      queryClient.invalidateQueries(QueryKey.Order);
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

export function useDeleteOrderQy(
  onSuccess?:
    | ((data: MessageResponseDto) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: unknown) => void | Promise<unknown>) | undefined
) {
  const queryClient = useQueryClient();
  const { showProgress, hideProgress, showError } = useNotificationContext();
  const { errorAction } = useErrorAction();

  const apiFn = async (payload: DeletePurchaseOrderDto) => {
    showProgress();
    const operation = await PurchaseOrderApiFp().purchaseOrderControllerDelete(
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
      queryClient.invalidateQueries(QueryKey.Order);
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

export function useDeletePurchaseRequestInOrderQy(
  id: string,
  onSuccess?:
    | ((data: MessageResponseDto) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: unknown) => void | Promise<unknown>) | undefined
) {
  const queryClient = useQueryClient();
  const { showProgress, hideProgress, showError } = useNotificationContext();
  const { errorAction } = useErrorAction();

  const apiFn = async (payload: DeletePoPrDto) => {
    showProgress();
    const operation =
      await PurchaseOrderPurchaseRequestApiFp().poPrControllerDelete(
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
      queryClient.invalidateQueries([QueryKey.Order, id]);
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

export function useQyAddDeliveryOrder(
  onSuccess?:
    | ((data: MessageResponseDto) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: unknown) => void | Promise<unknown>) | undefined
) {
  const queryClient = useQueryClient();
  const { showProgress, hideProgress, showError } = useNotificationContext();
  const { errorAction } = useErrorAction();

  const apiFn = async (payload: CreatePIDDto) => {
    showProgress();
    const operation =
      await PurchaseRequestItemDeliveryApiFp().prItemDeliveryControllerCreate(
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
      queryClient.invalidateQueries(QueryKey.Delivery);
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

export function useQyDeleteDeliveryOrder(
  onSuccess?:
    | ((data: MessageResponseDto) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: unknown) => void | Promise<unknown>) | undefined
) {
  const queryClient = useQueryClient();
  const { showProgress, hideProgress, showError } = useNotificationContext();
  const { errorAction } = useErrorAction();

  const apiFn = async (payload: DeletePIDDto) => {
    showProgress();
    const operation =
      await PurchaseRequestItemDeliveryApiFp().prItemDeliveryControllerDelete(
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
      queryClient.invalidateQueries(QueryKey.Delivery);
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
