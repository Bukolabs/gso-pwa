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
import { useAddItem, useEditItem, useGetItem } from "@core/query/item.query";
import { AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { LabelValue } from "@shared/models/label-value.interface";
import { FormToApiService } from "@core/services/form-to-api.service";
import { MessageResponseDto } from "@api/api";

export interface AddItemProps {
  defaultItem?: ItemFormSchema;
  closeSidebar: () => void;
}

export function AddItem({ defaultItem, closeSidebar }: AddItemProps) {
  const { getValues: getRequestItemValues, setValue } =
    useFormContext<RequestFormSchema>();
  const { showError, showSuccess, hideProgress } = useNotificationContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [enabledGetItem, setEnabledGetItem] = useState(false);
  const limit = 99;
  const page = 0;
  const isEditing = !!defaultItem;

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
  const handleAddApiSuccess = (response: MessageResponseDto) => {
    const itemForm = getItemFormValues();

    const code = (response.data as any)?.code;
    if (!itemForm || !code) return;

    addToNewRequest(code);
  };
  const { mutate: addItem } = useAddItem(handleAddApiSuccess);

  // EDIT ITEM
  const handleApiSuccess = () => {
    showSuccess("Item updated");
    addToNewRequest();
  };
  const { mutate: editItem } = useEditItem(handleApiSuccess);

  // FORM
  const defaultValues = defaultItem || itemFormDefault;
  const formMethod = useForm<ItemFormSchema>({
    defaultValues,
    resolver: zodResolver(ItemFormRule),
  });
  const { handleSubmit, getValues: getItemFormValues, reset } = formMethod;
  const handleValidate = (form: ItemFormSchema) => {
    const itemNameExist =
      (itemList?.data || []).filter((x) => x.name === form.name).length > 0;

    if (isEditing) {
      const formData = FormToApiService.EditItem(form, form.code || "");
      editItem(formData);
    } else if (itemNameExist && !!form.code) {
      addToNewRequest();
    } else {
      const formData = FormToApiService.NewItem(form);
      addItem(formData);
    }
  };
  const handleValidateError = (err: FieldErrors<ItemFormSchema>) => {
    const formMessage = getFormErrorMessage(err);
    showError(formMessage);
  };
  const addToNewRequest = (newCode = "") => {
    const requestFormItemValues = getRequestItemValues("items");
    const itemForm = getItemFormValues();
    const updatedItemForm = newCode
      ? {
          ...itemForm,
          code: newCode,
        }
      : itemForm;
    const codeExistInRequestFormItemValues =
      requestFormItemValues.filter((x) => x.code === updatedItemForm.code)
        .length > 0;
    let allItems = requestFormItemValues;

    if (codeExistInRequestFormItemValues) {
      allItems = requestFormItemValues.map((item) => {
        if (item.code === updatedItemForm.code) {
          return updatedItemForm;
        }
        return item;
      });
    } else {
      allItems = [
        ...requestFormItemValues,
        { ...itemForm, code: updatedItemForm.code },
      ];
    }

    console.log("Add Items", { allItems });
    hideProgress();
    setValue("items", allItems);
    showSuccess(`${itemForm.name} is added to Purchase Request items`);
    reset(itemFormDefault);
    closeSidebar();
  };

  return (
    <div className="new-item">
      <FormBrandItemProvider>
        <FormUnitItemProvider>
          <FormCategoryItemProvider>
            <FormProvider {...formMethod}>
              <FormItem
                suggestions={suggestions}
                itemList={itemList?.data}
                showSearch={!isEditing}
                onSearch={handleItemSearch}
              />

              <div className="flex justify-end">
                <Button
                  label={isEditing ? "Update" : "Add"}
                  onClick={handleSubmit(handleValidate, handleValidateError)}
                  outlined
                />
              </div>
            </FormProvider>
          </FormCategoryItemProvider>
        </FormUnitItemProvider>
      </FormBrandItemProvider>
    </div>
  );
}

export default AddItem;
