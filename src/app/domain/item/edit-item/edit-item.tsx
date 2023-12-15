import HeaderContent from "@shared/ui/header-content/header-content";
import "./edit-item";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { ItemFormRule, ItemFormSchema } from "@core/model/form.rule";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { getItemFormDefault } from "@core/model/get-form.default";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditItem, useGetItemById } from "@core/query/item.query";
import { ItemControllerGetDataAsList200Response } from "@api/api";
import { useState } from "react";
import { FormToApiService } from "@core/services/form-to-api.service";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { getFormErrorMessage } from "@core/utility/get-error-message";
import SkeletonList from "@shared/ui/skeleton-list/skeleton-list";
import ErrorSection from "@shared/ui/error-section/error-section";
import FormItem from "../new-item/form-item/form-item";
import { FormBrandItemProvider } from "../new-item/form-brand-item/brand.context";
import { FormUnitItemProvider } from "../new-item/form-unit-item/form-unit-item.context";
import { FormCategoryItemProvider } from "../new-item/form-category-item/form-category-item.context";

export function EditItem() {
  const { showSuccess, showError } = useNotificationContext();
  const navigate = useNavigate();
  const [dataEmpty, setDataEmpty] = useState(false);
  const { itemId } = useParams();

  const handleGetApiSuccess = (
    data: ItemControllerGetDataAsList200Response
  ) => {
    if (data && data.count && data.count > 0) {
      const item = data.data?.[0];
      setValue("name", item?.name || "");
      setValue("description", item?.description || "");
      setValue("brand", item?.brand || "");
      setValue("unit", item?.unit || "");
      setValue("category", item?.category || "");
      setValue("cost", item?.price || 0);
      setDataEmpty(false);
      return;
    }

    return setDataEmpty(true);
  };
  const {
    data: item,
    isLoading,
    isError: itemError,
  } = useGetItemById(itemId || "", handleGetApiSuccess);

  const handleApiSuccess = () => {
    showSuccess("Item updated");
    handleBack();
  };
  const { mutate: editItem, isError: editError } =
    useEditItem(handleApiSuccess);

  const formMethod = useForm<ItemFormSchema>({
    defaultValues: getItemFormDefault(item?.data?.[0]),
    resolver: zodResolver(ItemFormRule),
  });
  const { handleSubmit, setValue } = formMethod;

  const handleBack = () => {
    navigate("../");
  };
  const handleValidate = (form: ItemFormSchema) => {
    const formData = FormToApiService.EditItem(form, itemId || "");
    editItem(formData);
  };
  const handleValidateError = (err: FieldErrors<ItemFormSchema>) => {
    const formMessage = getFormErrorMessage(err);
    showError(formMessage);
  };

  const displayLoading = (
    <div className="card">
      <SkeletonList count={4} />
    </div>
  );
  const displayError = (
    <div className="card">
      <ErrorSection
        title="No Data"
        message="No data found in selected record. Please try again."
      />
    </div>
  );

  return (
    <div className="edit-item">
      <HeaderContent title="Edit Item" onBack={() => navigate("../")}>
        <Button
          label="Update"
          onClick={handleSubmit(handleValidate, handleValidateError)}
        />
      </HeaderContent>
      <div className="p-7">
        <FormBrandItemProvider>
          <FormUnitItemProvider>
            <FormCategoryItemProvider>
              <FormProvider {...formMethod}>
                {isLoading && displayLoading}
                {(itemError || editError || dataEmpty) &&
                  !isLoading &&
                  displayError}
                {!isLoading && !dataEmpty && <FormItem />}
              </FormProvider>
            </FormCategoryItemProvider>
          </FormUnitItemProvider>
        </FormBrandItemProvider>
      </div>
    </div>
  );
}

export default EditItem;
