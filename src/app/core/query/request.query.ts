import {
  CreatePurchaseRequestDto,
  EditPurchaseRequestDto,
  GetPrItemDto,
  MessageResponseDto,
  ProcessPurchaseRequestDto,
  PurchaseRequestApiFp,
  PurchaseRequestControllerGetDataAsList200Response,
} from "@api/api";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { authHeaders } from "./auth-header";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { QueryKey } from "./query-key.enum";
import { getApiErrorMessage } from "@core/utility/get-error-message";

export function useGetRequestQy(
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
  const apiFn = async (
    search: string | undefined = undefined,
    limit: number | undefined = undefined,
    offset: number | undefined = undefined,
    order: object | undefined = undefined,
    filter: Record<string, string> | undefined = undefined
  ) => {
    showProgress();
    const operation =
      await PurchaseRequestApiFp().purchaseRequestControllerGetDataAsList(
        search,
        limit,
        offset,
        order,
        filter,
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
      if (onError) {
        onError(err);
      }
    },
    onSettled() {
      hideProgress();
    },
    select(data) {
      const parseData = data.data?.map((pr) => {
        const objectifiedItems = !pr.items
          ? []
          : (JSON.parse(pr.items as unknown as string) as GetPrItemDto[]);
        const items = pr.items ? objectifiedItems : [];

        return {
          ...pr,
          items,
        };
      });

      return { ...data, data: parseData };
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
  const apiFn = async (id: string, search = "", limit = 1, offset = 0) => {
    showProgress();
    const operation =
      await PurchaseRequestApiFp().purchaseRequestControllerGetDataAsList(
        search,
        limit,
        offset,
        undefined,
        JSON.stringify({ code: id }) as any,
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

  const apiFn = async (payload: CreatePurchaseRequestDto) => {
    showProgress();
    const operation =
      await PurchaseRequestApiFp().purchaseRequestControllerCreate(
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
      if (onError) {
        onError(err);
      }
    },
    onSettled() {
      hideProgress();
    },
  });
}