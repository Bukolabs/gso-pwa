import "./add-item";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import {
  ItemFormRule,
  ItemFormSchema,
  RequestFormSchema,
} from "@core/model/form.rule";
import {
  FieldErrors,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { itemFormDefault } from "@core/model/form.default";
import { zodResolver } from "@hookform/resolvers/zod";
import { getFormErrorMessage } from "@core/utility/get-error-message";
import { Button } from "primereact/button";
import FormItem from "@domain/item/new-item/form-item/form-item";
import { FormBrandItemProvider } from "@domain/item/new-item/form-brand-item/brand.context";
import { FormUnitItemProvider } from "@domain/item/new-item/form-unit-item/form-unit-item.context";
import { FormCategoryItemProvider } from "@domain/item/new-item/form-category-item/form-category-item.context";
import { useState } from "react";
import { useAddItem, useGetItem } from "@core/query/item.query";
import { AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { LabelValue } from "@shared/models/label-value.interface";
import { FormToApiService } from "@core/services/form-to-api.service";

export function AddItem() {
  const { getValues: getRequestValues, setValue } =
    useFormContext<RequestFormSchema>();
  const { showError, showSuccess } = useNotificationContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [enabledGetItem, setEnabledGetItem] = useState(false);
  const limit = 99;
  const page = 0;

  // GET ITEM
  const [suggestions, setSuggestions] = useState<LabelValue[]>([]);
  const { data: itemList } = useGetItem(
    searchTerm,
    limit,
    page,
    undefined,
    undefined,
    enabledGetItem,
    (itemList) => {
      const mappedSuggestions = (itemList?.data || [])
        .map(
          (item) =>
            ({
              label: item.name,
              value: item.code,
            } as LabelValue)
        )
        .filter((x) => !!x.label);
      setSuggestions(mappedSuggestions);
    }
  );
  const handleItemSearch = (term: AutoCompleteCompleteEvent) => {
    setSearchTerm(term.query);
    setEnabledGetItem(true);
  };

  // ADD ITEM
  const [itemForm, setItemForm] = useState<ItemFormSchema | undefined>(
    undefined
  );
  const handleAddApiSuccess = () => {
    const requestFormItemValues = getRequestValues("items");

    if (!itemForm) return;

    const itemValues = [...requestFormItemValues, itemForm];
    setValue("items", itemValues);
    // showSuccess(`${form.name} is added to Purchase Request items`);
  };
  const { mutate: addItem } = useAddItem(handleAddApiSuccess);

  const formMethod = useForm<ItemFormSchema>({
    defaultValues: itemFormDefault,
    resolver: zodResolver(ItemFormRule),
  });
  const { handleSubmit } = formMethod;
  const handleValidate = (form: ItemFormSchema) => {
    setItemForm(form);
    const formData = FormToApiService.NewItem(form);
    addItem(formData);
    // console.log(form);
    // const requestFormItemValues = getValues("items");
    // const itemValues = [...requestFormItemValues, form];
    // setValue("items", itemValues);
    // showSuccess(`${form.name} is added to Purchase Request items`);
  };
  const handleValidateError = (err: FieldErrors<ItemFormSchema>) => {
    const formMessage = getFormErrorMessage(err);
    showError(formMessage);
  };

  return (
    <div className="new-item">
      <div className="p-7">
        <FormBrandItemProvider>
          <FormUnitItemProvider>
            <FormCategoryItemProvider>
              <div className="flex justify-end">
                <Button
                  label="Add"
                  onClick={handleSubmit(handleValidate, handleValidateError)}
                  outlined
                />
              </div>

              <FormProvider {...formMethod}>
                <FormItem
                  suggestions={suggestions}
                  itemList={itemList?.data}
                  onSearch={handleItemSearch}
                />
              </FormProvider>
            </FormCategoryItemProvider>
          </FormUnitItemProvider>
        </FormBrandItemProvider>
      </div>
    </div>
  );
}

export default AddItem;
