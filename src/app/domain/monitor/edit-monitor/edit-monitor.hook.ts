import { InventoryControllerGetDataAsList200Response } from "@api/api";
import { useQyGetInventoryById } from "@core/query/inventory.query";
import { useParams } from "react-router-dom";

export function useEditMonitor() {
  const { monitorId } = useParams();

  // UNCACHED, GET API VALUES
  // GET REQUEST API
  const handleGetApiSuccess = (
    data: InventoryControllerGetDataAsList200Response
  ) => {
    if (data && data.count && data.count > 0) {
      const responseData = data.data?.[0];
      return;
    }
  };
  const {
    data: requests,
    isLoading,
    isError: requestError,
  } = useQyGetInventoryById(monitorId || "", handleGetApiSuccess);
  const inventoryData = requests?.data?.[0];
}
