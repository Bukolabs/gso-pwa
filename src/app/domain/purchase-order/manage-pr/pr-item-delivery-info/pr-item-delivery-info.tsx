import { useNavigate, useParams } from "react-router-dom";
import "./pr-item-delivery-info.scss";
import { getSelectedOrder } from "@core/utility/order-helper";
import {
  DeliveryCollectionFormRule,
  DeliveryCollectionFormSchema,
  ItemFormSchema,
} from "@core/model/form.rule";
import { Sidebar } from "primereact/sidebar";
import ItemCard from "@core/ui/item-card/item-card";
import { FieldErrors, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGetOrderByIdQy,
  useQyAddDeliveryOrder,
} from "@core/query/order.query";
import { PurchaseOrderControllerGetDataAsList200Response } from "@api/api";
import { Button } from "primereact/button";
import { getFormErrorMessage } from "@core/utility/get-error-message";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import InputDigitControl from "@shared/ui/hook-form/input-digit-control/input-digit-control";
import { useFormBrandItemContext } from "@domain/item/new-item/form-brand-item/brand.context";
import DropdownControl from "@shared/ui/hook-form/dropdown-control/dropdown-control";
import { DropdownFilterEvent } from "primereact/dropdown";
import { FormToApiService } from "@core/services/form-to-api.service";
import InputTextareaControl from "@shared/ui/hook-form/input-textarea-control/input-textarea-control";
import { useQueryClient } from "react-query";
import { QueryKey } from "@core/query/query-key.enum";
import { InputText } from "primereact/inputtext";

export function PrItemDeliveryInfo() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { orderId, requestId } = useParams();
  const {
    sidebar,
    newBrand,
    mappedBrands,
    isCreating,
    setSidebar,
    setFilter,
    setNewBrand,
    handleFilterInput,
    handleAdd,
  } = useFormBrandItemContext();
  const { showError, showSuccess } = useNotificationContext();

  const handleGetApiSuccess = (
    data: PurchaseOrderControllerGetDataAsList200Response
  ) => {
    const orders = data.data;
    const requestData = getSelectedOrder(orders || [], requestId || "");
    const formItems = (requestData?.items || []).map(
      (item) =>
        ({
          code: item.code,
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
          prCode: item.purchase_request,
        } as ItemFormSchema)
    );

    formItems.forEach((item) => {
      append({
        prCode: item.prCode,
        prItemCode: item.code,
        brand: item.brand || "",
        brandName: "",
        deliveredQuantity: 0,
        description: "",
        itemDetails: item,
      });
    });
  };
  useGetOrderByIdQy(orderId || "", !!orderId, handleGetApiSuccess);

  const handleDeliveryApiSuccess = () => {
    showSuccess("New delivery added");
    queryClient.invalidateQueries([QueryKey.Order, orderId]);
    handleBack();
  };
  const { mutate: deliver } = useQyAddDeliveryOrder(handleDeliveryApiSuccess);

  // FORM
  const formMethod = useForm<DeliveryCollectionFormSchema>({
    defaultValues: {
      collection: [],
    },
    resolver: zodResolver(DeliveryCollectionFormRule),
  });
  const { handleSubmit, control } = formMethod;
  const { fields, append } = useFieldArray({
    control,
    name: "collection",
  });

  const handleValidate = (form: DeliveryCollectionFormSchema) => {
    const filteredCollection = form.collection.filter(
      (x) => x.deliveredQuantity > 0
    );
    const formData = FormToApiService.AddDelivery({
      collection: filteredCollection,
    });
    deliver(formData);
  };
  const handleValidateError = (
    err: FieldErrors<DeliveryCollectionFormSchema>
  ) => {
    const formMessage = getFormErrorMessage(err);
    showError(formMessage);
  };

  const handleBack = () => navigate("../");

  return (
    <div className="pr-item-delivery-info">
      <Sidebar
        visible={true}
        onHide={() => handleBack()}
        className="w-full md:w-2/5"
      >
        <h2 className="mb-2">Log Delivered Items</h2>
        <div className="flex flex-wrap gap-2">
          {newBrand && (
            <Sidebar visible={sidebar} onHide={() => setSidebar(false)}>
              <h2>Create new brand</h2>
              <p>
                You are creating a new brand. Please, fill the fields to create
                a new brand and apply to current item creation.
              </p>
              <div className="flex flex-col gap-2 mt-4">
                <InputText
                  placeholder="Brand Name"
                  value={newBrand.name}
                  onChange={(e: any) =>
                    setNewBrand({ ...newBrand, name: e.target.value })
                  }
                />
                <InputText
                  placeholder="Brand Description"
                  value={newBrand.description}
                  onChange={(e: any) =>
                    setNewBrand({ ...newBrand, description: e.target.value })
                  }
                />

                <Button
                  label="Create"
                  onClick={handleAdd}
                  className="block"
                  disabled={isCreating}
                />
              </div>
            </Sidebar>
          )}

          {fields.map((field, index) =>
            field.itemDetails ? (
              <ItemCard key={field.id} itemNo={index} item={field.itemDetails}>
                <div className="p-4">
                  <DropdownControl<DeliveryCollectionFormSchema>
                    control={control}
                    name={`collection.${index}.brand`}
                    label="Brand"
                    options={mappedBrands}
                    containerClassName="mb-9"
                    className="w-full md:w-3/4"
                    placeholder="Enter your brand name"
                    filter
                    onFilter={(e: DropdownFilterEvent) => setFilter(e.filter)}
                    onKeyDown={handleFilterInput}
                  />
                  <InputDigitControl<DeliveryCollectionFormSchema>
                    control={control}
                    name={`collection.${index}.deliveredQuantity`}
                    label="Delivered Quantity"
                    className="w-full md:w-3/4"
                    containerClassName="mb-9"
                  />
                  <InputTextareaControl<DeliveryCollectionFormSchema>
                    control={control}
                    name={`collection.${index}.description`}
                    label="Remarks / Description"
                    containerClassName="mb-9"
                    className="w-full md:w-3/4"
                  />
                </div>
              </ItemCard>
            ) : null
          )}
          <Button
            label="Submit"
            onClick={handleSubmit(handleValidate, handleValidateError)}
          />
        </div>
      </Sidebar>
    </div>
  );
}

export default PrItemDeliveryInfo;
