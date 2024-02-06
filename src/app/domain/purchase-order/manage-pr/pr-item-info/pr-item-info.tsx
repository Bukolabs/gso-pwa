import { Button } from "primereact/button";
import "./pr-item-info.scss";
import { QueryKey } from "@core/query/query-key.enum";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import {
  useEditRequestQy,
  useGetRequestByIdQy,
} from "@core/query/request.query";
import { ItemFormSchema, PurchaseItemFormSchema } from "@core/model/form.rule";
import { ApiToFormService } from "@core/services/api-to-form.service";
import { FormToApiService } from "@core/services/form-to-api.service";
import ItemCard from "@core/ui/item-card/item-card";
import { FormBrandItemProvider } from "@domain/item/new-item/form-brand-item/brand.context";
import PrItemAction from "../pr-item-action/pr-item-action";
import { showEditRequestItemElements } from "@core/utility/stage-helper";
import { Sidebar } from "primereact/sidebar";
import { useUserIdentity } from "@core/utility/user-identity.hook";

export function PrItemInfo() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { orderId, requestId } = useParams();
  const { showSuccess } = useNotificationContext();
  const { isBACApprover } = useUserIdentity();

  const { data: requestResponse } = useGetRequestByIdQy(requestId || "");
  const requestData = requestResponse?.data?.[0];
  const status = requestData?.status_name;
  const formItems = (requestData?.items || []).map(
    (item) =>
      ({
        code: item.item,
        name: item.item_name,
        brand: item.brand,
        brandName: item.brand_name,
        category: item.category_name,
        description: item.description,
        isActive: true,
        cost: item.price,
        unit: item.unit,
        unitName: item.unit_name,
        categoryName: item.category_name,
        quantity: item.quantity,
        deliveredQuantity: item.delivered_quantity,
      } as ItemFormSchema)
  );

  // EDIT REQUEST
  const handleRequestApiSuccess = () => {
    queryClient.invalidateQueries([QueryKey.Order, orderId]);
    showSuccess("Request items updated");
    handleBack();
  };
  const { mutate: editRequest } = useEditRequestQy(handleRequestApiSuccess);

  // FORM
  const handlePRView = (prId: string) => {
    navigate(`/request/${prId}`);
  };
  const handleBack = () => navigate("../");
  const handleUpdatePRItem = (form: ItemFormSchema) => {
    if (requestData) {
      const editSchema = ApiToFormService.MapPurchaseRequestToForm(requestData);
      const updatedItems = editSchema.items.map((subItem) => {
        if (form.code === subItem.code) {
          return {
            ...subItem,
            brand: form.brand,
            description: form.description,
            cost: form.cost,
            quantity: form.quantity,
            deliveredQuantity: form.deliveredQuantity,
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
      editRequest(formData);
    }
  };

  return (
    <div className="pr-item-info">
      <Sidebar
        visible={true}
        onHide={() => handleBack()}
        className="w-full md:w-2/5"
      >
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
          {(formItems || []).map((item, id) => {
            return (
              <ItemCard key={id} itemNo={id} item={item}>
                {!isBACApprover && showEditRequestItemElements(status) ? (
                  <div>
                    <FormBrandItemProvider>
                      <PrItemAction item={item} onUpdate={handleUpdatePRItem} />
                    </FormBrandItemProvider>
                  </div>
                ) : null}
              </ItemCard>
            );
          })}
        </div>
      </Sidebar>
    </div>
  );
}

export default PrItemInfo;
