import "./new-monitor.scss";
import { useQyAddManualInventory } from "@core/query/inventory.query";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageResponseDto } from "@api/api";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { useNavigate } from "react-router-dom";
import { InventoryFormRule, InventoryFormSchema } from "@core/model/form.rule";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { inventoryFormDefault } from "@core/model/form.default";
import { getFormErrorMessage } from "@core/utility/get-error-message";
import { FormToApiService } from "@core/services/form-to-api.service";
import HeaderContent from "@shared/ui/header-content/header-content";
import { Button } from "primereact/button";
import FormMonitor from "../form-monitor/form-monitor";
import FormManualMonitor from "../form-manual-monitor/form-manual-monitor";
import { FormCategoryItemProvider } from "@domain/item/new-item/form-category-item/form-category-item.context";
import { FormBrandItemProvider } from "@domain/item/new-item/form-brand-item/brand.context";
import { FormUnitItemProvider } from "@domain/item/new-item/form-unit-item/form-unit-item.context";

export function NewMonitor() {
  const navigate = useNavigate();
  const { showError, showSuccess, showWarning } = useNotificationContext();
  const handleApiSuccess = (response: MessageResponseDto) => {
    const data = response.data as any;

    showSuccess(`New inventory item is created`);
    navigate(`../${data.code}`);
  };
  const { mutate: addManualInventory, isLoading: isCreating } =
    useQyAddManualInventory(handleApiSuccess);

  const formMethod = useForm<InventoryFormSchema>({
    defaultValues: inventoryFormDefault,
    resolver: zodResolver(InventoryFormRule),
  });
  const { handleSubmit } = formMethod;

  const handleValidate = (form: InventoryFormSchema) => {
    const formData = FormToApiService.NewManualInventory(form);
    console.log({form, formData});
    addManualInventory(formData);
  };
  const handleValidateError = (err: FieldErrors<InventoryFormSchema>) => {
    const formMessage = getFormErrorMessage(err);
    showError(formMessage);
  };

  return (
    <div className="new-monitor">
      <HeaderContent title="New Monitoring" onBack={() => navigate("../")}>
        <Button
          className="w-full block"
          label="Save"
          disabled={isCreating}
          onClick={handleSubmit(handleValidate, handleValidateError)}
        ></Button>
      </HeaderContent>

      <div className="p-7">
        <FormProvider {...formMethod}>
          <FormCategoryItemProvider>
            <FormBrandItemProvider>
              <FormUnitItemProvider>
                <section className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4 bg-white">
                  <FormMonitor />

                  <section className="p-6">
                    <FormManualMonitor />
                  </section>
                </section>
              </FormUnitItemProvider>
            </FormBrandItemProvider>
          </FormCategoryItemProvider>
        </FormProvider>
      </div>
    </div>
  );
}

export default NewMonitor;
