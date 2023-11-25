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

export function NewItem() {
  const navigate = useNavigate();
  const { showError } = useNotificationContext();

  const handleApiSuccess = () => handleBack();
  const { mutate: addBidder } = useAddItem(handleApiSuccess);

  const formMethod = useForm<ItemFormSchema>({
    defaultValues: itemFormDefault,
    resolver: zodResolver(ItemFormRule),
  });
  const { handleSubmit } = formMethod;

  const handleBack = () => {
    navigate("../");
  };

  const handleValidate = (form: ItemFormSchema) => {
    const formData = FormToApiService.NewItem(form);
    addBidder(formData);
  };
  const handleValidateError = (err: FieldErrors<ItemFormSchema>) => {
    showError("Please populate the required fields");
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
        <FormProvider {...formMethod}>
          <FormItem />
        </FormProvider>
      </div>
    </div>
  );
}

export default NewItem;
