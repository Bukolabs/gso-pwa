import {
  DashboardApiFp,
  DashboardControllerGetStage1ReviewSummary200Response,
  DashboardControllerGetStage1Summary200Response,
} from "@api/api";
import { authHeaders } from "./auth-header";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { QueryKey } from "./query-key.enum";
import { getApiErrorMessage } from "@core/utility/get-error-message";

export function useGetStage1SummaryQy(
  onSuccess?:
    | ((
        data: DashboardControllerGetStage1Summary200Response
      ) => void | Promise<unknown>)
    | undefined,
  onError?: ((error: AxiosError) => void | Promise<unknown>) | undefined
) {
  const { showProgress, hideProgress, showError } = useNotificationContext();
  const apiFn = async () => {
    showProgress();
    const operation =
      await DashboardApiFp().dashboardControllerGetStage1Summary(authHeaders());
    const response = (await operation()).data;
    return response["data"] as DashboardControllerGetStage1Summary200Response;
  };

  return useQuery({
    queryKey: [QueryKey.Stage1],
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

export function useGetStage1SummaryReviewQy(
   onSuccess?:
     | ((
         data: DashboardControllerGetStage1ReviewSummary200Response
       ) => void | Promise<unknown>)
     | undefined,
   onError?: ((error: AxiosError) => void | Promise<unknown>) | undefined
 ) {
   const { showProgress, hideProgress, showError } = useNotificationContext();
   const apiFn = async () => {
     showProgress();
     const operation =
       await DashboardApiFp().dashboardControllerGetStage1ReviewSummary(authHeaders());
     const response = (await operation()).data;
     return response["data"] as DashboardControllerGetStage1ReviewSummary200Response;
   };
 
   return useQuery({
     queryKey: [QueryKey.Stage1Review],
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