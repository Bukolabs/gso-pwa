import { Button } from "primereact/button";
import "./pr-item-info.scss";
import { QueryKey } from "@core/query/query-key.enum";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { useEditRequestQy } from "@core/query/request.query";
import { ItemFormSchema, PurchaseItemFormSchema } from "@core/model/form.rule";
import { GetPurchaseRequestDto } from "@api/api";
import { ApiToFormService } from "@core/services/api-to-form.service";
import { FormToApiService } from "@core/services/form-to-api.service";
import ItemCard from "@core/ui/item-card/item-card";
import { currencyFormat } from "@shared/formats/currency-format";
import { FormBrandItemProvider } from "@domain/item/new-item/form-brand-item/brand.context";
import PrItemAction from "../pr-item-action/pr-item-action";

export interface PrItemInfoProps {
  requestItems: ItemFormSchema[];
  requestData?: GetPurchaseRequestDto;
}

export function PrItemInfo({ requestData, requestItems }: PrItemInfoProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showSuccess } = useNotificationContext();

  // EDIT REQUEST
  const handleRequestApiSuccess = () => {
    queryClient.invalidateQueries(QueryKey.Order);
    showSuccess("Request items updated");
  };
  const { mutate: editRequest } = useEditRequestQy(handleRequestApiSuccess);

  const handlePRView = (prId: string) => {
    navigate(`/request/${prId}`);
  };
  const handleUpdatePRItem = (
    item: ItemFormSchema,
    brand: string,
    deliveredQuantity: number | null,
    newQuantity: number | null
  ) => {
    if (requestData) {
      const editSchema = ApiToFormService.MapPurchaseRequestToForm(requestData);
      const updatedItems = editSchema.items.map((subItem) => {
        if (item.code === subItem.code) {
          const quantity =
            newQuantity !== null ? newQuantity : subItem.quantity;
          return {
            ...subItem,
            brand: brand,
            quantity,
            deliveredQuantity: deliveredQuantity,
          };
        }

        return subItem;
      }) as PurchaseItemFormSchema[];
      const updatedSchema = {
        ...editSchema,
        items: updatedItems,
      };

      const formData = FormToApiService.EditPurchaseRequest(
        updatedSchema,
        requestData.code
      );
      console.log({ editSchema, updatedSchema });
      editRequest(formData);
    }
  };

  return (
    <div className="pr-item-info">
      <h2>Request Items</h2>
      <Button
        label="View full request"
        onClick={() => handlePRView(requestData?.code || "")}
        size="small"
        className="block mb-4"
        severity="secondary"
        outlined
      />
      <div className="flex flex-wrap gap-2">
        {(requestItems || []).map((item, id) => {
          const releasedAmount = (item.deliveredQuantity || 0) * item.cost;
          return (
            <ItemCard key={id} itemNo={id} item={item}>
              <section className="flex justify-center gap-3 py-4 border-b border-gray-200">
                <div className="flex flex-col items-center justify-center">
                  <p className="text-gray-800 font-bold">
                    {item.deliveredQuantity || 0}
                  </p>
                  <p className="hint">Delivered Quantity</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="text-gray-800 font-bold">
                    {currencyFormat(releasedAmount, "PHP")}
                  </p>
                  <p className="hint">Released Amount</p>
                </div>
              </section>
              <FormBrandItemProvider>
                <PrItemAction item={item} onUpdate={handleUpdatePRItem} />
              </FormBrandItemProvider>
            </ItemCard>
          );
        })}
      </div>
    </div>
  );
}

export default PrItemInfo;
