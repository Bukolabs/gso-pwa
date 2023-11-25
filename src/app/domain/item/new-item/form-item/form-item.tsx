import { ItemFormSchema } from "@core/model/form.rule";
import "./form-item";
import { useFormContext } from "react-hook-form";
import InputControl from "@shared/ui/hook-form/input-control/input-control";
import CheckboxControl from "@shared/ui/hook-form/checkbox-control/checkbox-control";
import InputTextareaControl from "@shared/ui/hook-form/input-textarea-control/input-textarea-control";

/* eslint-disable-next-line */
export interface FormItemProps {}

export function FormItem() {
  const { control } = useFormContext<ItemFormSchema>();
  return (
    <div className="form-item">
      <div className="form-request py-2 md:bg-white md:px-6">
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
        <InputControl<ItemFormSchema>
          control={control}
          name="unit"
          label="Unit (Required)"
          containerClassName="mb-9"
          className="w-full md:w-3/4"
          placeholder="Enter your mobile number"
          hint="e.g. piece"
        />
        <InputControl<ItemFormSchema>
          control={control}
          name="category"
          label="Category"
          containerClassName="mb-9"
          className="w-full md:w-3/4"
          placeholder="Enter your street address"
          hint="e.g. Appliance"
        />
        <InputControl<ItemFormSchema>
          control={control}
          name="brand"
          label="Brand"
          containerClassName="mb-9"
          className="w-full md:w-3/4"
          placeholder="Enter your barangay"
          hint="e.g. Dyson"
        />
      </div>
    </div>
  );
}

export default FormItem;
