import { BidderApiAxiosParamCreator, CreateBidderDto } from "@api/api";
import { FetchService } from "@core/query/fetch.service";
import { authHeaders } from "@core/query/auth-header";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { QueryKey } from "./query-key.enum";

export function useGetBidder() {
  const apiFn = async () => {
    const operation =
      await BidderApiAxiosParamCreator().bidderControllerGetDataAsList(
        authHeaders()
      );
    const response = FetchService.Get(operation).then(
      (response) => response.data
    );
    return response;
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
    const operation = await BidderApiAxiosParamCreator().bidderControllerCreate(
      payload,
      authHeaders()
    );
    const response = FetchService.Post(operation).then(
      (response) => response.data
    );
    return response;
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
