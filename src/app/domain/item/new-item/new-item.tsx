import { useNavigate } from "react-router-dom";
import "./new-item";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { useAddItem } from "@core/query/item.query";
import { ItemFormRule, ItemFormSchema } from "@core/model/form.rule";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { itemFormDefault } from "@core/model/form.default";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormToApiService } from "@core/services/form-to-api.service";
import HeaderContent from "@shared/ui/header-content/header-content";
import { Button } from "primereact/button";
import FormItem from "./form-item/form-item";
import { getFormErrorMessage } from "@core/utility/get-error-message";
import { FormBrandItemProvider } from "./form-brand-item/brand.context";
import { FormUnitItemProvider } from "./form-unit-item/form-unit-item.context";
import { FormCategoryItemProvider } from "./form-category-item/form-category-item.context";

export function NewItem() {
  const navigate = useNavigate();
  const { showError, showSuccess } = useNotificationContext();

  const handleBack = () => {
    navigate("../");
  };
  const handleApiSuccess = () => {
    showSuccess("New item created");
    handleBack();
  };
  const { mutate: addItem } = useAddItem(handleApiSuccess);

  const formMethod = useForm<ItemFormSchema>({
    defaultValues: itemFormDefault,
    resolver: zodResolver(ItemFormRule),
  });
  const { handleSubmit } = formMethod;

  const handleValidate = (form: ItemFormSchema) => {
    const formData = FormToApiService.NewItem(form);
    addItem(formData);
  };
  const handleValidateError = (err: FieldErrors<ItemFormSchema>) => {
    const formMessage = getFormErrorMessage(err);
    showError(formMessage);
  };

  return (
    <div className="new-item">
      <HeaderContent title="New Item" onBack={() => navigate("../")}>
        <Button
          label="Save"
          onClick={handleSubmit(handleValidate, handleValidateError)}
        />
      </HeaderContent>

      <div className="p-7">
        <FormBrandItemProvider>
          <FormUnitItemProvider>
            <FormCategoryItemProvider>
              <FormProvider {...formMethod}>
                <FormItem />
              </FormProvider>
            </FormCategoryItemProvider>
          </FormUnitItemProvider>
        </FormBrandItemProvider>
      </div>
    </div>
  );
}

export default NewItem;
