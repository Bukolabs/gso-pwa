import { InputText } from "primereact/inputtext";
import { zodResolver } from "@hookform/resolvers/zod";
import "./pr-item-action.scss";
import { useFormBrandItemContext } from "@domain/item/new-item/form-brand-item/brand.context";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { DropdownFilterEvent } from "primereact/dropdown";
import { ItemFormRule, ItemFormSchema } from "@core/model/form.rule";
import { FieldErrors, useForm } from "react-hook-form";
import InputDigitControl from "@shared/ui/hook-form/input-digit-control/input-digit-control";
import InputTextareaControl from "@shared/ui/hook-form/input-textarea-control/input-textarea-control";
import { Accordion, AccordionTab } from "primereact/accordion";
import DropdownControl from "@shared/ui/hook-form/dropdown-control/dropdown-control";
import { getFormErrorMessage } from "@core/utility/get-error-message";
import { useNotificationContext } from "@shared/ui/notification/notification.context";

export interface PrItemActionProps {
  item: ItemFormSchema;
  onUpdate: (form: ItemFormSchema) => void;
}

export function PrItemAction({ item, onUpdate }: PrItemActionProps) {
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
  const { showError } = useNotificationContext();

  // FORM
  const formMethod = useForm<ItemFormSchema>({
    defaultValues: item,
    resolver: zodResolver(ItemFormRule),
  });
  const { handleSubmit, control } = formMethod;

  const handleValidate = (form: ItemFormSchema) => {
    onUpdate(form);
  };
  const handleValidateError = (err: FieldErrors<ItemFormSchema>) => {
    const formMessage = getFormErrorMessage(err);
    showError(formMessage);
  };

  const handleUpdate = () => {
    handleSubmit(handleValidate, handleValidateError)();
  };

  return (
    <div className="pr-item-action">
      {newBrand && (
        <Sidebar visible={sidebar} onHide={() => setSidebar(false)}>
          <h2>Create new brand</h2>
          <p>
            You are creating a new brand. Please, fill the fields to create a
            new brand and apply to current item creation.
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

      <section className="m-2 mb-4">
        <Accordion>
          <AccordionTab header="Update Fields">
            <InputTextareaControl<ItemFormSchema>
              control={control}
              name="description"
              label="Description"
              containerClassName="mb-9"
              className="w-full md:w-3/4"
              placeholder="Enter the item description"
              hint="e.g. Amplifies airflow. To heat you or cool you fast"
            />
            <InputDigitControl<ItemFormSchema>
              control={control}
              name="quantity"
              label="Quantity"
              containerClassName="mb-9"
              className="w-full md:w-3/4"
              placeholder="Enter the item quantity"
              hint="e.g. 5"
            />
            <InputDigitControl<ItemFormSchema>
              control={control}
              name="cost"
              label="Cost"
              containerClassName="mb-9"
              className="w-full md:w-3/4"
              placeholder="Enter the item quantity"
              hint="e.g. 5"
            />
            <DropdownControl<ItemFormSchema>
              control={control}
              name="brand"
              label="Brand"
              options={mappedBrands}
              containerClassName="mb-9"
              className="w-full md:w-3/4"
              placeholder="Enter your brand name"
              hint="e.g. Dyson. Hit ENTER to create a new brand. Otherwise, if the brand doesn't exist select N/A"
              filter
              onFilter={(e: DropdownFilterEvent) => setFilter(e.filter)}
              onKeyDown={handleFilterInput}
            />

            <Button
              className="block m-2"
              label="Update"
              onClick={handleUpdate}
            />
          </AccordionTab>
        </Accordion>
      </section>
    </div>
  );
}

export default PrItemAction;
