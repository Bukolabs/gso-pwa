import { useFormContext } from "react-hook-form";
import { RequestFormSchema } from "@core/model/form.rule";
import "./form-request";
import InputControl from "@shared/ui/hook-form/input-control/input-control";
import InputTextareaControl from "@shared/ui/hook-form/input-textarea-control/input-textarea-control";
import InputDateControl from "@shared/ui/hook-form/input-date-control/input-date-control";
import DropdownControl from "@shared/ui/hook-form/dropdown-control/dropdown-control";
import { useGetCategory } from "@core/query/category.query";
import { LabelValue } from "@shared/models/label-value.interface";
import CheckboxControl from "@shared/ui/hook-form/checkbox-control/checkbox-control";
import FormCategory from "./form-category/form-category";

export function FormRequest() {
  const { control } = useFormContext<RequestFormSchema>();
  const { data: categories } = useGetCategory();
  const mappedCategories = (categories?.data || []).map(
    (item) =>
      ({
        label: item.name,
        value: item.code,
      } as LabelValue)
  );

  return (
    <div className="form-request py-2 md:bg-white md:px-6">
      <InputDateControl<RequestFormSchema>
        control={control}
        name="dueDate"
        label="Issued Date"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        hint="e.g. 30/12/2023"
      />
      {/* <DropdownControl<RequestFormSchema>
        control={control}
        name="category"
        label="Category"
        options={mappedCategories}
        containerClassName="mb-9"
        className="w-full md:w-3/4"
        placeholder="Enter your category"
        hint="Select from the created category dropdown. Otherwise, hit ENTER to create a new category. If the category doesn't exist select N/A"
        filter
      /> */}
      <FormCategory />
      <InputControl<RequestFormSchema>
        control={control}
        name="departmentLabel"
        label="Department"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        placeholder="Enter Section"
        disabled={true}
      />
      <InputControl<RequestFormSchema>
        control={control}
        name="section"
        label="Section (Required)"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        placeholder="Enter Section"
        hint="e.g. Section Narra"
      />
      <InputTextareaControl<RequestFormSchema>
        control={control}
        name="purpose"
        label="Purpose"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        placeholder="Enter purpose of request"
        hint="e.g. for the betterment of fellow citizen"
      />
      <CheckboxControl<RequestFormSchema>
        control={control}
        name="isPPMP"
        label="Contains PPMP"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
      />
      <CheckboxControl<RequestFormSchema>
        control={control}
        name="isActivityDesign"
        label="Contains Activity Design"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
      />
    </div>
  );
}

export default FormRequest;
