import {
  CreatePrItemDto,
  CreatePurchaseRequestDto,
  DeletePurchaseRequestDto,
  EditPrItemDto,
  EditPurchaseRequestDto,
  MessageResponseDto,
  ProcessPurchaseRequestDto,
  PurchaseRequestApiFp,
  PurchaseRequestControllerGetDataAsList200Response,
  PurchaseRequestItemApiFp,
  ReceivePurchaseRequestDto,
} from "@api/api";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { authHeaders } from "./auth-header";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { QueryKey } from "./query-key.enum";
import { getApiErrorMessage } from "@core/utility/get-error-message";
import { useErrorAction } from "@core/utility/error-action.hook";
import { useUserIdentity } from "@core/utility/user-identity.hook";

export function useGetRequestQy(
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
        data: PurchaseRequestControllerGetDataAsList200Response
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
    filter: Record<string, string> | undefined = undefined,
    dateName: string | undefined = undefined,
    startDate: string | undefined = undefined,
    endDate: string | undefined = undefined
  ) => {
    showProgress();
    const operation =
      await PurchaseRequestApiFp().purchaseRequestControllerGetDataAsList(
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
    return response[
      "data"
    ] as PurchaseRequestControllerGetDataAsList200Response;
  };

  if (!!requestorDepartment) {
    queryFilter.department = requestorDepartment;
  }

  return useQuery({
    enabled,
    queryKey: [
      QueryKey.Request,
      search,
      limit,
      offset,
      order,
      queryFilter,
      dateName,
      startDate,
      endDate,
    ],
    queryFn: () =>
      apiFn(
        search,
        limit,
        offset,
        order,
        queryFilter,
        dateName,
        startDate,
        endDate
      ),
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

export function useGetRequestByIdQy(
  id: string,
  onSuccess?:
    | ((
        data: PurchaseRequestControllerGetDataAsList200Response
      ) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: AxiosError) => void | Promise<unknown>) | undefined
) {
  const { showProgress, hideProgress, showError } = useNotificationContext();
  const { errorAction } = useErrorAction();
  const apiFn = async (id: string, search = "", limit = 1, offset = 0) => {
    showProgress();
    const operation =
      await PurchaseRequestApiFp().purchaseRequestControllerGetDataAsList(
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
    return response[
      "data"
    ] as PurchaseRequestControllerGetDataAsList200Response;
  };

  return useQuery({
    queryKey: [QueryKey.Request, id],
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

export function useGetUnassignedRequestQy(
  search: string,
  limit = 10,
  offset = 0,
  order?: object,
  filter?: Record<string, string>,
  enabled?: boolean,
  onSuccess?:
    | ((
        data: PurchaseRequestControllerGetDataAsList200Response
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
      await PurchaseRequestApiFp().purchaseRequestControllerGetUnassisgnedPrAsList(
        search,
        limit,
        offset,
        order,
        JSON.stringify(filter) as any,
        authHeaders()
      );
    const response = (await operation()).data;
    return response[
      "data"
    ] as PurchaseRequestControllerGetDataAsList200Response;
  };

  return useQuery({
    enabled,
    queryKey: [QueryKey.Request, search, limit, offset, order, filter],
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

export function useAddRequestQy(
  onSuccess?:
    | ((data: MessageResponseDto) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: unknown) => void | Promise<unknown>) | undefined
) {
  const queryClient = useQueryClient();
  const { showProgress, hideProgress, showError } = useNotificationContext();
  const { errorAction } = useErrorAction();

  const apiFn = async (payload: CreatePurchaseRequestDto) => {
    showProgress();
    const operation =
      await PurchaseRequestApiFp().purchaseRequestControllerCreate(
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
      queryClient.invalidateQueries(QueryKey.Request);
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

export function useEditRequestQy(
  onSuccess?:
    | ((data: MessageResponseDto) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: unknown) => void | Promise<unknown>) | undefined
) {
  const queryClient = useQueryClient();
  const { showProgress, hideProgress, showError } = useNotificationContext();
  const { errorAction } = useErrorAction();

  const apiFn = async (payload: EditPurchaseRequestDto) => {
    showProgress();
    const operation =
      await PurchaseRequestApiFp().purchaseRequestControllerEdit(
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
      queryClient.invalidateQueries(QueryKey.Request);
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

export function useEditRequestItemQy(
  onSuccess?:
    | ((data: MessageResponseDto) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: unknown) => void | Promise<unknown>) | undefined
) {
  const queryClient = useQueryClient();
  const { showProgress, hideProgress, showError } = useNotificationContext();
  const { errorAction } = useErrorAction();

  const apiFn = async (payload: EditPrItemDto) => {
    showProgress();
    const operation = await PurchaseRequestItemApiFp().prItemControllerEdit(
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
      queryClient.invalidateQueries(QueryKey.Request);
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

export function useProcessRequestQy(
  onSuccess?:
    | ((data: MessageResponseDto) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: unknown) => void | Promise<unknown>) | undefined
) {
  const queryClient = useQueryClient();
  const { showProgress, hideProgress, showError } = useNotificationContext();
  const { errorAction } = useErrorAction();

  const apiFn = async (payload: ProcessPurchaseRequestDto) => {
    showProgress();
    const operation =
      await PurchaseRequestApiFp().purchaseRequestControllerProcess(
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
      queryClient.invalidateQueries(QueryKey.Request);
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

export function useProcessReceivedRequestQy(
  onSuccess?:
    | ((data: MessageResponseDto) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: unknown) => void | Promise<unknown>) | undefined
) {
  const queryClient = useQueryClient();
  const { showProgress, hideProgress, showError } = useNotificationContext();
  const { errorAction } = useErrorAction();

  const apiFn = async (payload: ReceivePurchaseRequestDto) => {
    showProgress();
    const operation =
      await PurchaseRequestApiFp().purchaseRequestControllerReceive(
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
      queryClient.invalidateQueries(QueryKey.Request);
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

export function useDeleteRequestQy(
  onSuccess?:
    | ((data: MessageResponseDto) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: unknown) => void | Promise<unknown>) | undefined
) {
  const queryClient = useQueryClient();
  const { showProgress, hideProgress, showError } = useNotificationContext();
  const { errorAction } = useErrorAction();

  const apiFn = async (payload: DeletePurchaseRequestDto) => {
    showProgress();
    const operation =
      await PurchaseRequestApiFp().purchaseRequestControllerDelete(
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
      queryClient.invalidateQueries(QueryKey.Request);
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

export function useQyAddItemToRequest(
  onSuccess?:
    | ((data: MessageResponseDto) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: unknown) => void | Promise<unknown>) | undefined
) {
  const queryClient = useQueryClient();
  const { showProgress, hideProgress, showError } = useNotificationContext();
  const { errorAction } = useErrorAction();

  const apiFn = async (payload: CreatePrItemDto) => {
    showProgress();
    const operation = await PurchaseRequestItemApiFp().prItemControllerCreate(
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
      queryClient.invalidateQueries(QueryKey.Request);
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
