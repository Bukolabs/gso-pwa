import { ItemFormSchema } from "@core/model/form.rule";
import "./form-item";
import { useFormContext } from "react-hook-form";
import InputControl from "@shared/ui/hook-form/input-control/input-control";
import InputTextareaControl from "@shared/ui/hook-form/input-textarea-control/input-textarea-control";
import FormBrandItem from "../form-brand-item/form-brand-item";
import FormUnitItem from "../form-unit-item/form-unit-item";
import FormCategoryItem from "../form-category-item/form-category-item";

export interface FormItemProps {}

export function FormItem() {
  const { control } = useFormContext<ItemFormSchema>();

  return (
    <div className="form-item">
      <div className="form-request py-2 md:bg-white md:px-6 mb-8">
        <InputControl<ItemFormSchema>
          control={control}
          name="name"
          label="Name (Required)"
          containerClassName="mb-9"
          className="w-full md:w-3/4"
          placeholder="Enter the item name"
          hint="e.g. Dyson Jet Focus fan heater"
        />
        <InputTextareaControl<ItemFormSchema>
          control={control}
          name="description"
          label="Description (Required)"
          containerClassName="mb-9"
          className="w-full md:w-3/4"
          placeholder="Enter the item description"
          hint="e.g. Amplifies airflow. To heat you or cool you fast"
        />

        <FormBrandItem />
        <FormUnitItem />
        <FormCategoryItem />
      </div>
    </div>
  );
}

export default FormItem;
