import {
  BidderApiFp,
  BidderControllerGetDataAsList200Response,
  CreateBidderDto,
  MessageResponseDto,
} from "@api/api";
import { authHeaders } from "@core/query/auth-header";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { QueryKey } from "./query-key.enum";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { AxiosError } from "axios";
import { getApiErrorMessage } from "@core/utility/get-error-message";

export function useGetBidder() {
  const { showProgress, hideProgress } = useNotificationContext();
  const apiFn = async (
    search = undefined,
    limit = undefined,
    offset = undefined,
    order = undefined
  ) => {
    showProgress();
    const operation = await BidderApiFp().bidderControllerGetDataAsList(
      search,
      limit,
      offset,
      order,
      authHeaders()
    );
    const response = (await operation()).data;
    return response["data"] as BidderControllerGetDataAsList200Response;
  };

  return useQuery({
    queryKey: QueryKey.Bidder,
    queryFn: () => apiFn(),
    onSuccess: () => {
      hideProgress();
    },
    onError: (err) => {
      hideProgress();
      console.error("handling error", err);
    },
  });
}

export function useAddBidder(
  onSuccess?:
    | ((data: MessageResponseDto) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: unknown) => void | Promise<unknown>) | undefined
) {
  const queryClient = useQueryClient();
  const { showProgress, hideProgress, showError } = useNotificationContext();

  const apiFn = async (payload: CreateBidderDto) => {
    showProgress();
    const operation = await BidderApiFp().bidderControllerCreate(
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
      queryClient.invalidateQueries(QueryKey.Bidder);
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
