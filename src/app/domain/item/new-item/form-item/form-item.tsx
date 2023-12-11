import { ItemFormSchema } from "@core/model/form.rule";
import "./form-item";
import { useFormContext } from "react-hook-form";
import InputControl from "@shared/ui/hook-form/input-control/input-control";
import InputTextareaControl from "@shared/ui/hook-form/input-textarea-control/input-textarea-control";
import FormBrandItem from "../form-brand-item/form-brand-item";
import FormUnitItem from "../form-unit-item/form-unit-item";
import FormCategoryItem from "../form-category-item/form-category-item";
import InputDigitControl from "@shared/ui/hook-form/input-digit-control/input-digit-control";
import AutocompleteControl from "@shared/ui/hook-form/autocomplete-control/autocomplete-control";
import { LabelValue } from "@shared/models/label-value.interface";
import {
  AutoCompleteCompleteEvent,
  AutoCompleteProps,
} from "primereact/autocomplete";
import { GetItemDto } from "@api/api";

export interface FormItemProps {
  suggestions?: LabelValue[];
  itemList?: GetItemDto[];
  onSearch?: (value: AutoCompleteCompleteEvent) => void;
}

export function FormItem({ suggestions, itemList, onSearch }: FormItemProps) {
  const { control, setValue } = useFormContext<ItemFormSchema>();
  const handleSelect = (event: AutoCompleteProps) => {
    const selectedItem = event.value;
    if (!selectedItem || !itemList || itemList?.length === 0) {
      return;
    }

    const selectedItemEntity = (itemList || []).filter((item) => item.code)[0];
    setValue("description", selectedItemEntity.description || "");
    setValue("cost", selectedItemEntity.price);
    setValue("brand", selectedItemEntity.brand);
    setValue("unit", selectedItemEntity.unit);
    setValue("category", selectedItemEntity.category);
    setValue("name", selectedItemEntity.name);
    setValue("quantity", 1);
  };

  return (
    <div className="form-item">
      <div className="form-request py-2 md:bg-white md:px-6 mb-8">
        {onSearch && suggestions ? (
          <AutocompleteControl<ItemFormSchema>
            control={control}
            suggestions={suggestions}
            name="name"
            label="Name (Required)"
            containerClassName="mb-9"
            className="w-full md:w-3/4"
            placeholder="Enter the item name"
            hint="Search items you want to add in the request e.g Dyson Jet fan heater"
            onSearch={onSearch}
            onSelect={handleSelect}
          />
        ) : (
          <InputControl<ItemFormSchema>
            control={control}
            name="name"
            label="Name (Required)"
            containerClassName="mb-9"
            className="w-full md:w-3/4"
            placeholder="Enter the item name"
            hint="e.g. Dyson Jet Focus fan heater"
          />
        )}

        <InputTextareaControl<ItemFormSchema>
          control={control}
          name="description"
          label="Description (Required)"
          containerClassName="mb-9"
          className="w-full md:w-3/4"
          placeholder="Enter the item description"
          hint="e.g. Amplifies airflow. To heat you or cool you fast"
        />
        <InputDigitControl<ItemFormSchema>
          control={control}
          name="cost"
          label="Cost (Required)"
          containerClassName="mb-9"
          className="w-full md:w-3/4"
          placeholder="Enter the item cost"
          hint="e.g. 150"
        />

        {onSearch && suggestions && (
          <InputDigitControl<ItemFormSchema>
            control={control}
            name="quantity"
            label="Quantity (Required)"
            containerClassName="mb-9"
            className="w-full md:w-3/4"
            placeholder="Enter the item quantity"
            hint="e.g. 300"
          />
        )}

        <FormUnitItem />
        <FormBrandItem />
        <FormCategoryItem />
      </div>
    </div>
  );
}

export default FormItem;
