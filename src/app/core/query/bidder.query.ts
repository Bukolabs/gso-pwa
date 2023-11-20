import {
  BidderApiFp,
  BidderControllerGetDataAsList200Response,
  CreateBidderDto,
  MessageResponseDto,
} from "@api/api";
import { authHeaders } from "@core/query/auth-header";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { QueryKey } from "./query-key.enum";

export function useGetBidder() {
  const apiFn = async (
    search = undefined,
    limit = undefined,
    offset = undefined,
    order = undefined
  ) => {
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
    onSuccess: () => {},
    onError: (err) => {
      console.error("handling error", err);
    },
  });
}

export function useAddBidder() {
  const queryClient = useQueryClient();

  const apiFn = async (payload: CreateBidderDto) => {
    const operation = await BidderApiFp().bidderControllerCreate(
      payload,
      authHeaders()
    );
    const response = (await operation()).data;
    return response["message"] as MessageResponseDto;
  };

  return useMutation({
    mutationFn: apiFn,
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKey.Bidder);
    },
    onError: (err) => {
      console.error("handling error", err);
    },
  });
}
